const axios = require('axios');
const axiosRetry = require('axios-retry').default;
const NodeCache = require('node-cache');
const Price = require('../models/Price');

// Configure axios retry once (applies to all requests from this axios instance)
axiosRetry(axios, {
  retries: 4,
  retryDelay: (retryCount) => retryCount * 2000, // 2s, 4s, 8s, 16s
  retryCondition: (error) => {
    return (
      error.code === 'ECONNABORTED' ||
      !error.response ||
      (error.response && error.response.status >= 500)
    );
  },
  onRetry: (retryCount, error, requestConfig) => {
    console.warn(
      `Retrying Agmarknet request (${retryCount}/4) → ${error.message} | URL: ${requestConfig.url}`
    );
  },
});

const cache = new NodeCache({ stdTTL: 3600 }); // 1 hour

const API_KEY = process.env.DATA_GOV_API_KEY;
const API_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

exports.getPrices = async (req, res) => {
  try {
    const { state, commodity } = req.query;
    const cacheKey = `prices_${state || 'all'}_${commodity || 'all'}`;

    // 1. Memory cache hit?
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    // 2. Look for recent data in MongoDB (last 12 hours)
    let prices = await Price.find({
      ...(state && { state }),
      ...(commodity && { commodity }),
      fetchedAt: { $gte: new Date(Date.now() - 12 * 60 * 60 * 1000) },
    }).lean();

    // 3. No recent data → fetch from API
    if (prices.length === 0) {
      let offset = 0;
      const limit = 500;
      let allRecords = [];

      // Optional: restrict date range when fetching without filters (prevents millions of records)
      let dateFilter = null;
      if (!state && !commodity) {
        const today = new Date();
        const daysBack = 30; // ← change this value as needed (7–60)
        const fromDate = new Date(today);
        fromDate.setDate(today.getDate() - daysBack);
        dateFilter = `>=${fromDate.toISOString().split('T')[0]}`;
        console.log(`No filters → restricting to last ${daysBack} days: ${dateFilter}`);
      }

      console.log(`Fetching Agmarknet → state=${state || 'all'}, commodity=${commodity || 'all'}`);

      while (true) {
        const params = {
          'api-key': API_KEY,
          format: 'json',
          limit,
          offset,
          ...(state && { 'filters[state]': state }),
          ...(commodity && { 'filters[commodity]': commodity }),
        };

        if (dateFilter) {
          params['filters[arrival_date]'] = dateFilter;
        }

        const response = await axios.get(API_URL, {
          params,
          timeout: 60000, // 60 seconds
        });

        const records = response.data.records || [];
        if (records.length === 0) break;

        allRecords = allRecords.concat(records);
        offset += limit;

        console.log(`Fetched page: ${records.length} records  (total so far: ${allRecords.length})`);
      }

      // Transform API response to your schema
      prices = allRecords.map((record) => ({
        state: record.state || 'Unknown',
        district: record.district || 'Unknown',
        market: record.market || 'Unknown',
        commodity: record.commodity || 'Unknown',
        variety: record.variety || 'Unknown',
        min_price: parseFloat(record.min_price) || 0,
        max_price: parseFloat(record.max_price) || 0,
        modal_price: parseFloat(record.modal_price) || 0,
        date: new Date(record.arrival_date),
      }));

      // 4. Upsert instead of insert → prevents duplicate key errors
      if (prices.length > 0) {
        const operations = prices.map((price) => ({
          updateOne: {
            filter: {
              state: price.state,
              district: price.district,
              market: price.market,
              commodity: price.commodity,
              variety: price.variety,
              date: price.date,
            },
            update: {
              $set: {
                ...price,
                fetchedAt: new Date(),
              },
            },
            upsert: true,
          },
        }));

        const result = await Price.bulkWrite(operations, { ordered: false });

        console.log(
          `Bulk upsert completed → ` +
          `inserted: ${result.insertedCount}, ` +
          `modified: ${result.modifiedCount}, ` +
          `upserted: ${result.upsertedCount}, ` +
          `matched: ${result.matchedCount}`
        );

        cache.del(cacheKey); // invalidate memory cache
      }
    }

    // 5. Cache and return
    cache.set(cacheKey, prices);
    res.json(prices);
  } catch (error) {
    console.error('Error in getPrices:', error.message);
    console.error(error.stack);

    if (error.response) {
      console.error('API response → status:', error.response.status);
      console.error('API data:', error.response.data);
    }

    let status = 500;
    let message = 'Failed to fetch commodity prices';

    if (error.code === 'ECONNABORTED') {
      status = 504;
      message = 'Price API timed out after retries – please try again later';
    } else if (error.response?.status === 429) {
      status = 429;
      message = 'API rate limit exceeded – please wait a few minutes';
    } else if (error.code === 11000 || error.message.includes('E11000')) {
      status = 409;
      message = 'Duplicate data detected during save (already handled)';
    }

    res.status(status).json({ error: message });
  }
};
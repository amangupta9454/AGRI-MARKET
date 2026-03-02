import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getPrices } from '../utils/api';
import i18next from '../utils/i18n';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PriceTransparency = () => {
  const { t } = useTranslation();
  const [prices, setPrices] = useState([]);
  const [state, setState] = useState('');
  const [commodity, setCommodity] = useState('');
  const [language, setLanguage] = useState(i18next.language || 'en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [lastFetched, setLastFetched] = useState(null);

  const states = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', /* shortened for demo */
  ];

  const commodities = [
    'Wheat', 'Rice', 'Maize', 'Onion', 'Potato', 'Tomato', 'Brinjal',
    'Cauliflower', 'Green Peas', 'Okra', 'Mango', 'Banana', 'Apple',
    'Groundnut', 'Soybean', 'Mustard', 'Turmeric', 'Chilli', 'Cotton', /* shortened */
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'mr', name: 'मराठी' },
  ];

  const fetchPrices = async (force = false) => {
    setLoading(true);
    setError('');
    try {
      const res = await getPrices({ state, commodity, forceRefresh: force });
      setPrices(res.data || []);
      setLastFetched(new Date());
    } catch (err) {
      setError(t('error.fetchingData') || 'Failed to load prices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, [state, commodity, language]); // language change can trigger re-fetch if translations affect UI

  const filtered = prices.filter(p =>
    [p.state, p.district, p.market, p.commodity, p.variety]
      .some(val => val?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sorted = React.useMemo(() => {
    if (!sortConfig.key) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortConfig.direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filtered, sortConfig]);

  const toggleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const isOutdated = lastFetched && (Date.now() - lastFetched) > 12 * 60 * 60 * 1000;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            {t('priceTransparency.title') || 'Market Prices'}
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchPrices(true)}
              disabled={loading}
              className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition shadow-sm disabled:opacity-50"
            >
              {loading ? 'Loading...' : t('priceTransparency.refresh') || 'Refresh'}
            </button>

            <select
              value={language}
              onChange={e => {
                const lng = e.target.value;
                setLanguage(lng);
                i18next.changeLanguage(lng);
              }}
              className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <select
            value={state}
            onChange={e => setState(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">{t('priceTransparency.selectState') || 'All States'}</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select
            value={commodity}
            onChange={e => setCommodity(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">{t('priceTransparency.selectCommodity') || 'All Commodities'}</option>
            {commodities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('priceTransparency.searchPlaceholder') || 'Search market, variety...'}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Status */}
        {lastFetched && (
          <p className={`text-sm mb-4 ${isOutdated ? 'text-amber-700' : 'text-gray-600'}`}>
            {t('priceTransparency.lastUpdated') || 'Last updated'}: {lastFetched.toLocaleString()}
            {isOutdated && ` • ${t('priceTransparency.outdated') || 'data may be outdated'}`}
          </p>
        )}

        {/* Loading / Error */}
        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Content */}
        {!loading && !error && sorted.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {t('priceTransparency.noData') || 'No prices found for current filters'}
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            {/* Desktop / Tablet Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      { key: 'state', label: t('priceTransparency.state') },
                      { key: 'district', label: t('priceTransparency.district') },
                      { key: 'market', label: t('priceTransparency.market') },
                      { key: 'commodity', label: t('priceTransparency.commodity') },
                      { key: 'variety', label: t('priceTransparency.variety') },
                      { key: 'min_price', label: t('priceTransparency.minPrice'), numeric: true },
                      { key: 'max_price', label: t('priceTransparency.maxPrice'), numeric: true },
                      { key: 'modal_price', label: t('priceTransparency.modalPrice'), numeric: true },
                      { key: 'date', label: t('priceTransparency.date') },
                    ].map(col => (
                      <th
                        key={col.key}
                        onClick={() => toggleSort(col.key)}
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                      >
                        <div className="flex items-center gap-1">
                          {col.label}
                          {sortConfig.key === col.key && (
                            <span className="text-green-600">
                              {sortConfig.direction === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {sorted.map((p, i) => (
                    <tr key={i} className="hover:bg-green-50/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.state}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.district}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.market}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.commodity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{p.variety}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{p.min_price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{p.max_price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">₹{p.modal_price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(p.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 px-4">
              {sorted.map((p, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="font-medium text-gray-700">{t('priceTransparency.commodity')}:</div>
                    <div className="font-semibold text-gray-900">{p.commodity}</div>

                    <div className="font-medium text-gray-700">{t('priceTransparency.state')}:</div>
                    <div>{p.state}</div>

                    <div className="font-medium text-gray-700">{t('priceTransparency.market')}:</div>
                    <div>{p.market}</div>

                    <div className="font-medium text-gray-700">{t('priceTransparency.variety')}:</div>
                    <div>{p.variety}</div>

                    <div className="font-medium text-gray-700">{t('priceTransparency.minPrice')}:</div>
                    <div>₹{p.min_price}</div>

                    <div className="font-medium text-gray-700">{t('priceTransparency.maxPrice')}:</div>
                    <div>₹{p.max_price}</div>

                    <div className="font-medium text-gray-700">{t('priceTransparency.modalPrice')}:</div>
                    <div className="font-bold text-green-700">₹{p.modal_price}</div>

                    <div className="font-medium text-gray-700">{t('priceTransparency.date')}:</div>
                    <div>{new Date(p.date).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceTransparency;
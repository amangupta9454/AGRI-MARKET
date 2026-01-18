const axios = require('axios');
exports.reverseGeocode = async (req, res) => {
  const { lat, lng } = req.query;
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error in reverse geocode:', error);
    res.status(500).json({ message: 'Error in geocode', error: error.message });
  }
};
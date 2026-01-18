const Equipment = require('../models/Equipment');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const createEquipment = async (req, res) => {
  const { name, charge, rentalType, locationName, coordinates } = req.body;
  try {
    if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Only farmers can create equipment listings' });
    let imageUrl = null;
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'farmers-market/equipment', use_filename: true, unique_filename: false },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    }
    const equipment = new Equipment({
      name,
      charge,
      rentalType,
      location: coordinates ? { coordinates: JSON.parse(coordinates) } : undefined,
      locationName,
      image: imageUrl,
      farmer: req.user.id,
    });
    await equipment.save();
    res.status(201).json(equipment);
  } catch (error) {
    console.error('Error creating equipment:', error);
    res.status(500).json({ message: 'Error creating equipment', error: error.message });
  }
};
const getEquipments = async (req, res) => {
  const { lat, lng, maxDistance } = req.query;
  try {
    const query = lat && lng ? {
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseFloat(maxDistance) || 10000,
        },
      },
    } : {};
    const equipments = await Equipment.find(query).populate('farmer', 'name location');
    res.json(equipments);
  } catch (error) {
    console.error('Error fetching equipments:', error);
    res.status(500).json({ message: 'Error fetching equipments', error: error.message });
  }
};
const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id).populate('farmer', 'name location');
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
    res.json(equipment);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ message: 'Error fetching equipment', error: error.message });
  }
};
const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
    if (equipment.farmer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the owner can delete it' });
    }
    await equipment.deleteOne();
    res.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    res.status(500).json({ message: 'Error deleting equipment', error: error.message });
  }
};
module.exports = { createEquipment, getEquipments, getEquipmentById, deleteEquipment };
const mongoose = require('mongoose');
const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  charge: { type: Number, required: true },
  rentalType: { type: String, enum: ['hourly', 'daily'], required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
  locationName: { type: String, required: true },
  image: { type: String },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});
EquipmentSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Equipment', EquipmentSchema);
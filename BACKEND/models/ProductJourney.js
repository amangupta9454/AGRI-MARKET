const mongoose = require('mongoose');

// NEW FEATURE: Farm-to-Plate Journey Tracker - ProductJourney Schema
const productJourneySchema = new mongoose.Schema({
  product: {
    // Note: User prompt refers to 'Product', but existing models show 'Listing' as product equivalent.
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Listing',
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  harvestDate: { type: Date },
  qualityCheckDate: { type: Date },
  packedDate: { type: Date },
  shippedDate: { type: Date },
  deliveredDate: { type: Date },
  transportRoute: { type: String },
  currentStatus: {
    type: String,
    enum: ['harvested', 'quality_checked', 'packed', 'shipped', 'delivered'],
    default: 'harvested',
  },
  timelineEvents: [{
    status: { type: String },
    timestamp: { type: Date, default: Date.now },
    note: { type: String },
  }],
}, { timestamps: true });

module.exports = mongoose.model('ProductJourney', productJourneySchema);

const mongoose = require('mongoose');

// NEW FEATURE: Community Investment Farming - CropInvestment Schema
const cropInvestmentSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cropName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  totalRequiredAmount: {
    type: Number,
    required: true,
  },
  fundedAmount: {
    type: Number,
    default: 0,
  },
  expectedProfitPercentage: {
    type: Number,
    required: true,
  },
  minInvestment: {
    type: Number,
    required: true,
  },
  expectedHarvestDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'funded', 'completed', 'failed'],
    default: 'pending',
  },
  images: [{
    type: String,
  }],
  investorsCount: {
    type: Number,
    default: 0,
  },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

cropInvestmentSchema.virtual('fundingProgress').get(function() {
  if (this.totalRequiredAmount === 0) return 0;
  return (this.fundedAmount / this.totalRequiredAmount) * 100;
});

module.exports = mongoose.model('CropInvestment', cropInvestmentSchema);

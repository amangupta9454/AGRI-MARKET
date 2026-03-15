const mongoose = require('mongoose');

// NEW FEATURE: Community Investment Farming - Investment Schema
const investmentSchema = new mongoose.Schema({
  cropInvestment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CropInvestment',
    required: true,
  },
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  expectedReturn: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'invested', 'returned', 'cancelled'],
    default: 'invested',
  },
  transactionId: {
    type: String,
  },
  investedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Investment', investmentSchema);

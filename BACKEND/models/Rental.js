const mongoose = require('mongoose');
const RentalSchema = new mongoose.Schema({
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
  consumer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  duration: { type: Number, required: true },
  totalCharge: { type: Number, required: true },
  startDate: { type: Date, required: true },
  consumerAddress: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'accepted', 'rejected', 'completed'], default: 'pending' },
  rejectionMessage: { type: String },
  paymentDetails: {
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
  },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Rental', RentalSchema);
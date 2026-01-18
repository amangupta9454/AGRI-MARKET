const Rental = require('../models/Rental');
const Equipment = require('../models/Equipment');
const User = require('../models/User');
const Razorpay = require('razorpay');
const nodemailer = require('nodemailer');
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const createRental = async (req, res) => {
  const { equipmentId, duration, startDate, consumerAddress } = req.body;
  try {
    if (req.user.role !== 'consumer') return res.status(403).json({ message: 'Only consumers can place rentals' });
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
    const totalCharge = equipment.charge * duration;
    const razorpayOrder = await razorpay.orders.create({
      amount: totalCharge * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });
    const rental = new Rental({
      equipment: equipmentId,
      consumer: req.user.id,
      farmer: equipment.farmer,
      duration,
      totalCharge,
      startDate: new Date(startDate),
      consumerAddress,
      paymentDetails: {
        razorpayOrderId: razorpayOrder.id,
        amount: totalCharge,
      },
    });
    await rental.save();
    res.status(201).json({ rental, razorpayOrder });
  } catch (error) {
    console.error('Error creating rental:', error);
    res.status(500).json({ message: 'Error creating rental', error: error.message });
  }
};
const verifyPayment = async (req, res) => {
  const { orderId, razorpayPaymentId, razorpaySignature } = req.body;
  try {
    const crypto = require('crypto');
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${razorpayPaymentId}`)
      .digest('hex');
    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }
    const rental = await Rental.findOne({ 'paymentDetails.razorpayOrderId': orderId });
    if (!rental) return res.status(404).json({ message: 'Rental not found' });
    rental.paymentDetails.razorpayPaymentId = razorpayPaymentId;
    rental.status = 'confirmed';
    await rental.save();
    const equipment = await Equipment.findById(rental.equipment).populate('farmer', 'name email');
    const consumer = await User.findById(rental.consumer);
    const mailOptionsConsumer = {
      from: process.env.EMAIL_USER,
      to: consumer.email,
      subject: 'Rental Confirmation - Farmers Market',
      html: `
        <h2>Rental Confirmation</h2>
        <p>Thank you for your rental!</p>
        <h3>Rental Details</h3>
        <table border="1" cellpadding="5">
          <tr><th>Equipment</th><td>${equipment.name}</td></tr>
          <tr><th>Duration</th><td>${rental.duration} ${equipment.rentalType}</td></tr>
          <tr><th>Total Charge</th><td>₹${rental.totalCharge}</td></tr>
          <tr><th>Start Date</th><td>${new Date(rental.startDate).toLocaleString()}</td></tr>
          <tr><th>Status</th><td>${rental.status}</td></tr>
          <tr><th>Razorpay Payment ID</th><td>${razorpayPaymentId}</td></tr>
          <tr><th>Order Date</th><td>${new Date(rental.createdAt).toLocaleString()}</td></tr>
        </table>
        <h3>Your Address</h3>
        <p>${rental.consumerAddress}</p>
      `,
    };
    await transporter.sendMail(mailOptionsConsumer);
    const mailOptionsFarmer = {
      from: process.env.EMAIL_USER,
      to: equipment.farmer.email,
      subject: 'New Rental Request - Farmers Market',
      html: `
        <h2>New Rental Request</h2>
        <p>A consumer has requested to rent your equipment.</p>
        <h3>Rental Details</h3>
        <table border="1" cellpadding="5">
          <tr><th>Equipment</th><td>${equipment.name}</td></tr>
          <tr><th>Consumer Name</th><td>${consumer.name}</td></tr>
          <tr><th>Consumer Email</th><td>${consumer.email}</td></tr>
          <tr><th>Duration</th><td>${rental.duration} ${equipment.rentalType}</td></tr>
          <tr><th>Total Charge</th><td>₹${rental.totalCharge}</td></tr>
          <tr><th>Start Date</th><td>${new Date(rental.startDate).toLocaleString()}</td></tr>
          <tr><th>Consumer Address</th><td>${rental.consumerAddress}</td></tr>
        </table>
        <p>Please login to your dashboard to accept or reject.</p>
      `,
    };
    await transporter.sendMail(mailOptionsFarmer);
    res.json({ message: 'Payment verified and rental confirmed', rental });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Error verifying payment', error: error.message });
  }
};
const getRentals = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    let rentals = [];
    if (req.user.role === 'farmer') {
      rentals = await Rental.find({ farmer: req.user.id })
        .populate('equipment', 'name charge rentalType')
        .populate('consumer', 'name email');
    } else {
      rentals = await Rental.find({ consumer: req.user.id })
        .populate('equipment', 'name charge rentalType')
        .populate('consumer', 'name email');
    }
    res.json(rentals);
  } catch (error) {
    console.error('Error fetching rentals:', error);
    res.status(500).json({ message: 'Error fetching rentals', error: error.message });
  }
};
const acceptRental = async (req, res) => {
  const { rentalId } = req.body;
  try {
    if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Only farmers can accept rentals' });
    const rental = await Rental.findById(rentalId);
    if (!rental) return res.status(404).json({ message: 'Rental not found' });
    if (rental.farmer.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });
    if (rental.status !== 'confirmed') return res.status(400).json({ message: 'Rental cannot be accepted' });
    rental.status = 'accepted';
    await rental.save();
    const consumer = await User.findById(rental.consumer);
    const equipment = await Equipment.findById(rental.equipment);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: consumer.email,
      subject: 'Rental Accepted - Farmers Market',
      html: `
        <h2>Rental Accepted</h2>
        <p>Your rental for ${equipment.name} has been accepted by the farmer.</p>
        <p>Duration: ${rental.duration} ${equipment.rentalType}</p>
        <p>Total Charge: ₹${rental.totalCharge}</p>
        <p>Start Date: ${new Date(rental.startDate).toLocaleString()}</p>
      `,
    };
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Rental accepted successfully', rental });
  } catch (error) {
    console.error('Error accepting rental:', error);
    res.status(500).json({ message: 'Error accepting rental', error: error.message });
  }
};
const rejectRental = async (req, res) => {
  const { rentalId, rejectionMessage } = req.body;
  try {
    if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Only farmers can reject rentals' });
    if (!rejectionMessage) return res.status(400).json({ message: 'Rejection message is required' });
    const rental = await Rental.findById(rentalId);
    if (!rental) return res.status(404).json({ message: 'Rental not found' });
    if (rental.farmer.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });
    if (rental.status !== 'confirmed') return res.status(400).json({ message: 'Rental cannot be rejected' });
    rental.status = 'rejected';
    rental.rejectionMessage = rejectionMessage;
    await rental.save();
    const consumer = await User.findById(rental.consumer);
    const equipment = await Equipment.findById(rental.equipment);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: consumer.email,
      subject: 'Rental Rejected - Farmers Market',
      html: `
        <h2>Rental Rejected</h2>
        <p>Your rental for ${equipment.name} has been rejected by the farmer.</p>
        <p>Reason: ${rejectionMessage}</p>
        <p>Duration: ${rental.duration} ${equipment.rentalType}</p>
        <p>Total Charge: ₹${rental.totalCharge}</p>
        <p>Start Date: ${new Date(rental.startDate).toLocaleString()}</p>
      `,
    };
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Rental rejected successfully', rental });
  } catch (error) {
    console.error('Error rejecting rental:', error);
    res.status(500).json({ message: 'Error rejecting rental', error: error.message });
  }
};
module.exports = { createRental, verifyPayment, getRentals, acceptRental, rejectRental };
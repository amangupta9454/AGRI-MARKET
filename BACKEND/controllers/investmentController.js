const CropInvestment = require('../models/CropInvestment');
const Investment = require('../models/Investment');
const User = require('../models/User');
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// NEW FEATURE: Community Investment Farming

// ================= FARMER ENDPOINTS =================

exports.createCampaign = async (req, res) => {
  try {
    if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Only farmers can create campaigns.' });
    
    const { cropName, description, totalRequiredAmount, expectedProfitPercentage, minInvestment, expectedHarvestDate, images } = req.body;
    
    // Create new campaign
    const campaign = new CropInvestment({
      farmer: req.user.id,
      cropName,
      description,
      totalRequiredAmount,
      expectedProfitPercentage,
      minInvestment,
      expectedHarvestDate,
      images,
      status: 'pending' // Admin needs to approve
    });

    await campaign.save();
    res.status(201).json({ message: 'Campaign created successfully, pending admin approval.', campaign });
  } catch (error) {
    res.status(500).json({ message: 'Error creating campaign', error: error.message });
  }
};

exports.getFarmerCampaigns = async (req, res) => {
  try {
    if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Unauthorized.' });
    
    const campaigns = await CropInvestment.find({ farmer: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns', error: error.message });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Unauthorized.' });
    
    const campaign = await CropInvestment.findOneAndUpdate(
      { _id: req.params.id, farmer: req.user.id },
      req.body,
      { new: true }
    );
    if (!campaign) return res.status(404).json({ message: 'Campaign not found or unauthorized' });
    
    res.status(200).json({ message: 'Campaign updated', campaign });
  } catch (error) {
    res.status(500).json({ message: 'Error updating campaign', error: error.message });
  }
};

exports.markCampaignCompleted = async (req, res) => {
  try {
    if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Unauthorized.' });

    const campaign = await CropInvestment.findOneAndUpdate(
      { _id: req.params.id, farmer: req.user.id },
      { status: 'completed' },
      { new: true }
    );
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    res.status(200).json({ message: 'Campaign marked as completed', campaign });
  } catch (error) {
    res.status(500).json({ message: 'Error completing campaign', error: error.message });
  }
};


// ================= CONSUMER ENDPOINTS =================

exports.getApprovedCampaigns = async (req, res) => {
  try {
    const campaigns = await CropInvestment.find({ status: { $in: ['approved', 'funded'] } }).populate('farmer', 'name profileImage location');
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns', error: error.message });
  }
};

const transporter = require('nodemailer').createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

exports.investInCampaign = async (req, res) => {
  try {
    if (req.user.role !== 'consumer') return res.status(403).json({ message: 'Only consumers can invest.' });

    const { amount } = req.body;
    const campaignId = req.params.id;

    const campaign = await CropInvestment.findById(campaignId);
    if (!campaign || campaign.status !== 'approved') return res.status(400).json({ message: 'Campaign not available for funding.' });
    if (amount < campaign.minInvestment) return res.status(400).json({ message: `Minimum investment is ₹${campaign.minInvestment}` });
    if (campaign.fundedAmount + amount > campaign.totalRequiredAmount) return res.status(400).json({ message: 'Amount exceeds required funding.' });

    // Payment Integration Stub (Assuming Razorpay order gets generated)
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // strictly integer paise
      currency: 'INR',
      receipt: `invest_${Date.now()}`,
    });

    const expectedReturn = amount + (amount * (campaign.expectedProfitPercentage / 100));

    const investment = new Investment({
      cropInvestment: campaign._id,
      investor: req.user.id,
      amount,
      expectedReturn,
      transactionId: razorpayOrder.id,
      status: 'pending' // Wait for verification
    });

    await investment.save();

    res.status(201).json({ message: 'Investment order created.', investment, razorpayOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error initiating investment', error: error.message });
  }
};

exports.verifyInvestment = async (req, res) => {
  const { razorpayPaymentId, razorpaySignature, razorpayOrderId } = req.body;
  try {
    const crypto = require('crypto');
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    const investment = await Investment.findOne({ transactionId: razorpayOrderId })
      .populate('cropInvestment')
      .populate('investor', 'name email');
    if (!investment) return res.status(404).json({ message: 'Investment not found' });
    if (investment.status === 'invested') return res.status(400).json({ message: 'Already verified' });

    investment.status = 'invested';
    investment.transactionId = razorpayPaymentId; 
    await investment.save();

    const campaign = await CropInvestment.findById(investment.cropInvestment._id).populate('farmer', 'name email');
    campaign.fundedAmount += investment.amount;
    campaign.investorsCount += 1;
    if (campaign.fundedAmount >= campaign.totalRequiredAmount) {
      campaign.status = 'funded';
    }
    await campaign.save();

    // Send emails securely
    const commonMailOpts = { from: process.env.EMAIL_USER };
    
    await transporter.sendMail({
      ...commonMailOpts,
      to: investment.investor.email,
      subject: 'Investment Confirmation - AGRI-FARMIO',
      html: `
        <h2>Investment Successful</h2>
        <p>Thank you for supporting our farmers!</p>
        <p>You have successfully invested ₹${investment.amount} in <b>${campaign.cropName}</b>.</p>
        <p>Your expected return is <b>₹${investment.expectedReturn.toFixed(2)}</b></p>
        <p>Transaction ID: ${razorpayPaymentId}</p>
      `
    });

    await transporter.sendMail({
      ...commonMailOpts,
      to: campaign.farmer.email,
      subject: 'New Campaign Investment - AGRI-FARMIO',
      html: `
        <h2>New Investment Received!</h2>
        <p>Good news! Your campaign for <b>${campaign.cropName}</b> just received a new investment.</p>
        <p>Amount: <b>₹${investment.amount}</b> from consumer ${investment.investor.name}.</p>
        <p>Campaign Progress: ₹${campaign.fundedAmount} / ₹${campaign.totalRequiredAmount}</p>
      `
    });

    res.status(200).json({ message: 'Verified and completed successfully', investment });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying payment', error: error.message });
  }
};

exports.getMyInvestments = async (req, res) => {
  try {
    if (req.user.role !== 'consumer') return res.status(403).json({ message: 'Unauthorized.' });
    const investments = await Investment.find({ investor: req.user.id }).populate('cropInvestment');
    res.status(200).json(investments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your investments', error: error.message });
  }
};

// ================= ADMIN ENDPOINTS =================

exports.getAllCampaigns = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized.' });
    const campaigns = await CropInvestment.find({}).populate('farmer', 'name email');
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns', error: error.message });
  }
};

exports.approveCampaign = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized.' });
    const campaign = await CropInvestment.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.status(200).json({ message: 'Campaign approved', campaign });
  } catch (error) {
    res.status(500).json({ message: 'Error approving campaign', error: error.message });
  }
};

exports.rejectCampaign = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized.' });
    const campaign = await CropInvestment.findByIdAndUpdate(req.params.id, { status: 'failed' }, { new: true });
    res.status(200).json({ message: 'Campaign rejected', campaign });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting campaign', error: error.message });
  }
};

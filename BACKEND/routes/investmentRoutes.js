const express = require('express');
const router = express.Router();
const investmentController = require('../controllers/investmentController');
const { verifyToken } = require('../middleware/auth');

// NEW FEATURE: Community Investment Farming Routes
// Note: verifyToken parses JWT and adds req.user containing role and id.

// Farmer Routes
router.post('/create', verifyToken, investmentController.createCampaign);
router.get('/farmer-campaigns', verifyToken, investmentController.getFarmerCampaigns);
router.put('/update/:id', verifyToken, investmentController.updateCampaign);
router.patch('/complete/:id', verifyToken, investmentController.markCampaignCompleted);

// Consumer Routes
router.get('/approved', investmentController.getApprovedCampaigns);
router.post('/invest/:id', verifyToken, investmentController.investInCampaign);
router.post('/invest/verify', verifyToken, investmentController.verifyInvestment);
router.get('/my', verifyToken, investmentController.getMyInvestments);

// Admin Routes
router.get('/admin/all', verifyToken, investmentController.getAllCampaigns);
router.patch('/admin/approve/:id', verifyToken, investmentController.approveCampaign);
router.patch('/admin/reject/:id', verifyToken, investmentController.rejectCampaign);

module.exports = router;

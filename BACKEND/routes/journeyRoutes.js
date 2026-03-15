const express = require('express');
const router = express.Router();
const journeyController = require('../controllers/journeyController');
const { verifyToken } = require('../middleware/auth');

// NEW FEATURE: Farm-to-Plate Journey Tracker Routes

// Farmer Routes
router.post('/create', verifyToken, journeyController.createJourneyForOrder);
router.put('/update/:orderId', verifyToken, journeyController.updateJourneyStatus);
router.post('/timeline/:orderId', verifyToken, journeyController.addTimelineEvent);

// Consumer Route
router.get('/:orderId', verifyToken, journeyController.getJourneyByOrderId);

// Admin Route
router.get('/admin/all', verifyToken, journeyController.getAllJourneys);

module.exports = router;

const ProductJourney = require('../models/ProductJourney');
const Order = require('../models/Order');

// NEW FEATURE: Farm-to-Plate Journey Tracker

// ================= FARMER ENDPOINTS =================

exports.createJourneyForOrder = async (req, res) => {
  try {
    if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Only farmers can create a journey.' });

    const { orderId } = req.body;
    
    // Verify order belongs to this farmer
    const order = await Order.findById(orderId).populate('listing');
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    if (order.farmer.toString() !== req.user.id) return res.status(403).json({ message: 'You do not own this order.' });

    const existingJourney = await ProductJourney.findOne({ order: orderId });
    if (existingJourney) return res.status(400).json({ message: 'Journey already exists for this order.' });

    const journey = new ProductJourney({
      product: order.listing._id,
      order: order._id,
      farmer: req.user.id,
      currentStatus: 'harvested',
      harvestDate: Date.now(),
      timelineEvents: [{
        status: 'harvested',
        timestamp: Date.now(),
        note: 'Crop harvested from the farm.'
      }]
    });

    await journey.save();
    res.status(201).json({ message: 'Journey initiated securely', journey });
  } catch (error) {
    res.status(500).json({ message: 'Error creating journey', error: error.message });
  }
};

exports.updateJourneyStatus = async (req, res) => {
  try {
    if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Unauthorized.' });

    const { status, note, date, transportRoute } = req.body;
    const { orderId } = req.params;

    const journey = await ProductJourney.findOne({ order: orderId, farmer: req.user.id });
    if (!journey) return res.status(404).json({ message: 'Journey not found.' });

    journey.currentStatus = status;
    
    // Update specific dates based on status dynamically
    if (status === 'quality_checked') journey.qualityCheckDate = date || Date.now();
    if (status === 'packed') journey.packedDate = date || Date.now();
    if (status === 'shipped') { 
        journey.shippedDate = date || Date.now();
        if (transportRoute) journey.transportRoute = transportRoute;
    }
    if (status === 'delivered') journey.deliveredDate = date || Date.now();

    journey.timelineEvents.push({
      status,
      timestamp: date || Date.now(),
      note: note || `Package status updated to ${status}`
    });

    await journey.save();
    res.status(200).json({ message: 'Journey updated successfully', journey });
  } catch (error) {
    res.status(500).json({ message: 'Error updating journey', error: error.message });
  }
};

exports.addTimelineEvent = async (req, res) => {
  try {
    if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Unauthorized.' });
    
    const { orderId } = req.params;
    const { status, note } = req.body;

    const journey = await ProductJourney.findOne({ order: orderId, farmer: req.user.id });
    if (!journey) return res.status(404).json({ message: 'Journey not found' });

    journey.timelineEvents.push({
      status,
      timestamp: Date.now(),
      note
    });

    await journey.save();
    res.status(200).json({ message: 'Timeline event added', journey });
  } catch (error) {
    res.status(500).json({ message: 'Error adding event', error: error.message });
  }
};

// ================= CONSUMER ENDPOINTS =================

exports.getJourneyByOrderId = async (req, res) => {
  try {
    if (req.user.role !== 'consumer') return res.status(403).json({ message: 'Unauthorized.' });
    
    const { orderId } = req.params;
    
    // Must be buyer of order
    const order = await Order.findById(orderId);
    if (!order || order.consumer.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized to view this journey.' });
    }

    const journey = await ProductJourney.findOne({ order: orderId }).populate('farmer', 'name location');
    if (!journey) return res.status(404).json({ message: 'Journey not yet initiated for this order.' });

    res.status(200).json(journey);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching journey', error: error.message });
  }
};

// ================= ADMIN ENDPOINTS =================

exports.getAllJourneys = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized. Admin access required.' });
    
    const journeys = await ProductJourney.find({}).populate('farmer', 'name').populate('product', 'name');
    res.status(200).json(journeys);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all journeys', error: error.message });
  }
};

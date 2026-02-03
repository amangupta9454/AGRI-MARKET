require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const equipmentRoutes = require('./routes/equipments');
const rentalRoutes    = require('./routes/rentals');
const geocodeRoutes   = require('./routes/geocode');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const listingRoutes = require('./routes/listings');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const priceRoutes = require('./routes/prices');
const cron = require('./cronJob');

const app = express();

connectDB();

app.use(cors({
  origin: [process.env.FRONTEND_URL], // ← list allowed origins (add more if needed)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'], // add any custom headers your frontend sends
  credentials: true, // if you ever use cookies/auth with credentials
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api/equipments', equipmentRoutes);
app.use('/api/rentals',    rentalRoutes);
app.use('/api/geocode',    geocodeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/prices', priceRoutes);
app.get("/", (req, res) => {
  res.send({"msg": "BACKEND HOSTED SUCCESSFULLY"});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;   // ← this is the key line
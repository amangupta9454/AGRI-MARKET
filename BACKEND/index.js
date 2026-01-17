const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const listingRoutes = require('./routes/listings');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const priceRoutes = require('./routes/prices');
const cron = require('./cronJob');

const app = express();

connectDB();

app.use(cors("*"));
app.use(express.json());

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
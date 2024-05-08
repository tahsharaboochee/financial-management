require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const goalRoutes = require('./routes/goalRoutes');
const insightsRoutes = require('./routes/insightsRoutes');
const authMiddleware = require('./middleware/auth');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// User routes for registration and login
app.use(userRoutes);

// Transaction routes
app.use('/transactions', transactionRoutes);

// Goal routes
app.use('/goals', goalRoutes);

// insights routes
app.use('/insights', insightsRoutes);

// Example test route to check authentication
app.get('/test-auth', authMiddleware, (req, res) => {
    res.send(`Hello, ${req.user.username}! Authentication middleware is working.`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// Import necessary libraries
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Initialize dotenv to use environment variables
dotenv.config();
const app = express();

const transactionsRouter = require('./routes/transactions');


const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware for parsing JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Basic route i.e. root endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Use the transactions router for transaction-related routes
app.use('/transactions', transactionsRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

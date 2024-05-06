const express = require('express');
const router = express.Router();

// Get all transactions
router.get('/', (req, res) => {
    res.send('Transactions fetched');
});

// Add a transaction
router.post('/', (req, res) => {
    res.send('Transaction added');
});

module.exports = router;

const express = require('express');
const Transaction = require('../models/transaction');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all transactions for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id });
        res.send(transactions);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Post a new transaction
router.post('/', auth, async (req, res) => {
    const transaction = new Transaction({
        ...req.body,
        user: req.user._id
    });
    try {
        await transaction.save();
        res.status(201).send(transaction);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;

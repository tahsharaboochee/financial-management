const express = require('express');
const Transaction = require('../models/transaction');
const auth = require('../middleware/auth');
const router = express.Router();

// Validate transaction categories
const isValidCategory = (category) => {
    const allowedCategories = ['income', 'expense', 'saving'];
    return allowedCategories.includes(category);
};

// Get all transactions for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id });
        res.send(transactions);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Post a new transaction
router.post('/', auth, async (req, res) => {
    const { type, amount, category } = req.body;

    // Validate transaction category
    if (!isValidCategory(category)) {
        return res.status(400).send({ error: 'Invalid category' });
    }

    const transaction = new Transaction({
        ...req.body,
        user: req.user._id
    });
    try {
        await transaction.save();
        res.status(201).send(transaction);
    } catch (error) {
        res.status(400).send({ error: 'Unable to add transaction' });
    }
});

// Update a transaction
router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['type', 'amount', 'category', 'date'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user._id });

        if (!transaction) {
            return res.status(404).send({ error: 'Transaction not found' });
        }

        // Validate and update transaction category
        if (req.body.category && !isValidCategory(req.body.category)) {
            return res.status(400).send({ error: 'Invalid category' });
        }

        updates.forEach(update => transaction[update] = req.body[update]);
        await transaction.save();
        res.send(transaction);
    } catch (error) {
        res.status(400).send({ error: 'Unable to update transaction' });
    }
});

// Delete a transaction
router.delete('/:id', auth, async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!transaction) {
            return res.status(404).send({ error: 'Transaction not found' });
        }

        res.send(transaction);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;

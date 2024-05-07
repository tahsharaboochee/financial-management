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
            return res.status(404).send();
        }

        updates.forEach(update => transaction[update] = req.body[update]);
        await transaction.save();
        res.send(transaction);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a transaction
router.delete('/:id', auth, async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!transaction) {
            res.status(404).send();
        }

        res.send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

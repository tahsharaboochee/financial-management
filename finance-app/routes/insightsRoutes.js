const express = require('express');
const Transaction = require('../models/transaction');
const Goal = require('../models/goal');
const auth = require('../middleware/auth');
const router = express.Router();

// Get spending by category
router.get('/spending-by-category', auth, async (req, res) => {
    try {
        // console.log('Insights Routes file Authenticated User ID:', req.user._id); // Log the authenticated user ID
        const spending = await Transaction.aggregate([
            { $match: { user: req.user._id, type: 'expense' } },
            { $group: { _id: '$category', totalSpent: { $sum: '$amount' } } }
        ]);
        console.log('Spending by Category:', spending); // Log the spending data for debugging
        res.send(spending);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching spending by category' });
    }
});

// Compare income vs expenses over time
router.get('/income-vs-expenses', auth, async (req, res) => {
    try {
        const stats = await Transaction.aggregate([
            { $match: { user: req.user._id } },
            { $group: { _id: { month: { $month: '$date' }, year: { $year: '$date' }, type: '$type' }, total: { $sum: '$amount' } } },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);
        res.send(stats);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching income vs expenses' });
    }
});

// Progress towards financial goals
router.get('/goals-progress', auth, async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user._id });
        res.send(goals);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching goals progress' });
    }
});

module.exports = router;

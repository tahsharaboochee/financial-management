const express = require('express');
const Goal = require('../models/goal'); 
const auth = require('../middleware/auth');
const router = express.Router();

// Create a new goal
router.post('/', auth, async (req, res) => {
    const goal = new Goal({
        ...req.body,
        user: req.user._id // Link the goal to the user
    });
    try {
        await goal.save();
        res.status(201).send(goal);
    } catch (error) {
        res.status(400).send({ error: 'Error creating goal' });
    }
});

// Retrieve all goals for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user._id });
        res.send(goals);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching goals' });
    }
});

// Retrieve a specific goal by ID
router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const goal = await Goal.findOne({ _id: id, user: req.user._id });

        if (!goal) {
            return res.status(404).send({ error: 'Goal not found' });
        }

        res.send(goal);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Update a specific goal
router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'targetAmount', 'currentAmount', 'deadline'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });

        if (!goal) {
            return res.status(404).send();
        }

        updates.forEach(update => goal[update] = req.body[update]);
        await goal.save();
        res.send(goal);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a specific goal
router.delete('/:id', auth, async (req, res) => {
    try {
        const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!goal) {
            return res.status(404).send();
        }

        res.send(goal);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;

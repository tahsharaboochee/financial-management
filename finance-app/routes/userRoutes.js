const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// User registration
router.post('/users/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        const token = generateToken(user._id.toString());
        const userToSend = {
            _id: user._id,
            username: user.username,
            email: user.email
        };
        res.status(201).send({ user: userToSend, token });
    } catch (error) {
        res.status(400).send({ error: 'Failed to register user. Make sure the email is unique and valid.' });
    }
});

// User login
router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'User not found.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }
        const token = generateToken(user._id.toString());
        const userToSend = {
            _id: user._id,
            username: user.username,
            email: user.email
        };
        res.send({ user: userToSend, token });
    } catch (error) {
        res.status(500).send({ error: 'Server error during login.' });
    }
});

module.exports = router;

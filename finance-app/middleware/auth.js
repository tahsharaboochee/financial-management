const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id }); // Simplified to only check user ID

        if (!user) {
            throw new Error('No user found with this token.');
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication Error:', error);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        // console.log('******')
        // console.log('***AUTH.JS***')
        // console.log('******')
        // console.log('Authorization Header:', req.header('Authorization'));
        const token = req.header('Authorization').replace('Bearer ', '');
        // console.log('Inside the Auth file Token:', token); // Log the token for debugging
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('Decoded Token:', decoded); // Log the decoded token for debugging
        const user = await User.findOne({ _id: decoded._id }); // Simplified to only check user ID
        // console.log('******')
        // console.log('***AUTH.JS User saved***')
        // console.log('******')
        // console.log('Authenticated User:', user); // Log the authenticated user for debugging

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
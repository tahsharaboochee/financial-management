const User = require('../models/User');
const jwt = require('jsonwebtoken');

let testToken;

async function setupTestUser() {
    const userData = { username: 'testuser', email: 'testuser@example.com', password: 'Password123' };

    let user = await User.findOne({ email: userData.email });
    if (!user) {
        user = await new User(userData).save();
    }

    testToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { user, testToken };
}

module.exports = { setupTestUser };

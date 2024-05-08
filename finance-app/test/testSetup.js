const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Transaction = require('../models/transaction');

let testToken;
let testUserId;

async function setupTestUser() {
    const userData = { username: 'testuser', email: 'testuser@example.com', password: 'Password123' };

    let user = await User.findOne({ email: userData.email });
    if (!user) {
        user = await new User(userData).save();
    }

    testUserId = user._id;
    testToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { user, testToken, testUserId };
}

async function cleanupTestData() {
    await Transaction.deleteMany({ user: testUserId });
}

module.exports = { setupTestUser, testToken, testUserId, cleanupTestData };

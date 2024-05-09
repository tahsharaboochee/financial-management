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

    // console.log("Found User:", user);
    testUserId = user._id;
    // console.log("Test User ID:", testUserId);

    testToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Create test transactions
    const testTransactions = [
        { user: testUserId, type: 'income', amount: 100, category: 'income' },
        { user: testUserId, type: 'expense', amount: 50, category: 'expense' },
        { user: testUserId, type: 'saving', amount: 200, category: 'saving' },
    ];

    // const savedTransactions = await Transaction.create(testTransactions);

    // console.log('Test transactions created successfully:', savedTransactions);
    await Transaction.create(testTransactions);
    // console.log('Test transactions created successfully:', user, testToken, testUserId );
    // console.log('Test User ID:', testUserId, 'User:', user, 'test Token:', testToken);

    return { user, testToken, testUserId };
}

async function cleanupTestData() {
    await Transaction.deleteMany({ user: testUserId });
}

module.exports = { setupTestUser, testToken, testUserId, cleanupTestData };

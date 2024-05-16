const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Transaction = require('../models/transaction');
const Goal = require('../models/goal');

let testToken;
let testUserId;

async function setupTestUser() {
    const userData = { username: 'testuser', email: 'testuser@example.com', password: 'Password123' };

    // Clean up any existing user with the same email
    await User.deleteMany({ email: userData.email });

    let user = await new User(userData).save();

    testUserId = user._id;
    testToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const testTransactions = [
        { user: testUserId, type: 'income', amount: 100, category: 'income' },
        { user: testUserId, type: 'expense', amount: 50, category: 'expense' },
        { user: testUserId, type: 'saving', amount: 200, category: 'saving' },
    ];

    await Transaction.create(testTransactions);

    const testGoals = [
        { user: testUserId, targetAmount: 1000, currentAmount: 0, description: 'Test Goal 1 Description', deadline: new Date('2024-12-31') },
        { user: testUserId, targetAmount: 2000, currentAmount: 0, description: 'Test Goal 2 Description', deadline: new Date('2025-12-31') },
    ];

    await Goal.create(testGoals);

    return { user, testToken, testUserId };
}

async function cleanupTestData() {
    await User.deleteMany({});
    await Transaction.deleteMany({});
    await Goal.deleteMany({});
}

module.exports = { setupTestUser, cleanupTestData };

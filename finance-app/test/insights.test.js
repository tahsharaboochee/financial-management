const request = require('supertest');
const app = require('../server');
const { setupTestUser, testToken } = require('./testSetup');
const Transaction = require('../models/transaction');
const Goal = require('../models/goal');

beforeAll(async () => {
    await setupTestUser();
});

describe('Insights Routes', () => {
    describe('GET /spending-by-category', () => {
        it('should return spending by category', async () => {
            // Mock transaction data...
        });
    });

    describe('GET /income-vs-expenses', () => {
        it('should return income vs expenses over time', async () => {
            // Mock transaction data...
        });
    });

    describe('GET /goals-progress', () => {
        it('should return progress towards financial goals', async () => {
            // Mock goal data...
        });
    });
});

const request = require('supertest');
const app = require('../server');
const { setupTestUser, testToken, testUserId } = require('./testSetup');
const Transaction = require('../models/transaction');
const Goal = require('../models/goal');
const expect = require('chai').expect;

before(async function() {
    await setupTestUser();
});

describe('Insights Routes', function() {
    describe('GET /spending-by-category', function() {
        it('should require authentication', function(done) {
            request(app)
                .get('/insights/spending-by-category')
                .expect(401, done);
        });

        it('should return spending by category when authenticated', async function() {
            const res = await request(app)
                .get('/insights/spending-by-category')
                .set('Authorization', `Bearer ${testToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });

    describe('GET /income-vs-expenses', function() {
        it('should require authentication', function(done) {
            request(app)
                .get('/insights/income-vs-expenses')
                .expect(401, done);
        });

        it('should return income vs expenses over time when authenticated', async function() {
            const res = await request(app)
                .get('/insights/income-vs-expenses')
                .set('Authorization', `Bearer ${testToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });

    describe('GET /goals-progress', function() {
        it('should require authentication', function(done) {
            request(app)
                .get('/insights/goals-progress')
                .expect(401, done);
        });

        it('should return progress towards financial goals when authenticated', async function() {
            const res = await request(app)
                .get('/insights/goals-progress')
                .set('Authorization', `Bearer ${testToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });
});

after(async function() {
    // clean up any test data created during tests
    await Transaction.deleteMany({ user: testUserId });
    await Goal.deleteMany({ user: testUserId });
});

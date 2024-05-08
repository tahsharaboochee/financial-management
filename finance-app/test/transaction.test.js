const request = require('supertest');
const app = require('../server');
const expect = require('chai').expect;
const Transaction = require('../models/transaction');
const jwt = require('jsonwebtoken');

let testToken;

before(async function() {
    // Create a test user
    const userData = { username: 'testuser', email: 'testuser@example.com', password: 'Password123' };

    let user = await User.findOne({ email: userData.email });
    if (!user) {
        user = await new User(userData).save();
    }

    // Generate a test token
    testToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

describe('Transaction Tests', function() {
    describe('POST /transactions', function() {
        it('should require authentication', function(done) {
            request(app)
                .post('/transactions')
                .send({ type: 'income', amount: 100, category: 'salary' })
                .expect(401, done);
        });

        it('should add a new transaction when authenticated', function(done) {
            request(app)
                .post('/transactions')
                .set('Authorization', `Bearer ${testToken}`)
                .send({ type: 'income', amount: 100, category: 'salary' })
                .expect(201)
                .end(function(err, res) {
                    expect(res.body).to.have.property('_id');
                    done(err);
                });
        });

        it('should return 400 Bad Request for invalid transaction data', function(done) {
            request(app)
                .post('/transactions')
                .set('Authorization', `Bearer ${testToken}`)
                .send({ type: 'invalidType', amount: 'invalidAmount', category: 'invalidCategory' })
                .expect(400, done);
        });
    });

    describe('PATCH /transactions/:id', function() {
        it('should require authentication', function(done) {
            request(app)
                .patch('/transactions/123')
                .expect(401, done);
        });

        it('should update an existing transaction when authenticated', async function() {
            const transaction = await Transaction.findOne({ user: testUserId });
            request(app)
                .patch(`/transactions/${transaction._id}`)
                .set('Authorization', `Bearer ${testToken}`)
                .send({ amount: 200 })
                .expect(200);
        });

        it('should return 404 Not Found for non-existent transaction', function(done) {
            request(app)
                .patch('/transactions/nonexistent_id')
                .set('Authorization', `Bearer ${testToken}`)
                .send({ amount: 200 })
                .expect(404, done);
        });
    });

    describe('DELETE /transactions/:id', function() {
        it('should require authentication', function(done) {
            request(app)
                .delete('/transactions/123')
                .expect(401, done);
        });

        it('should delete an existing transaction when authenticated', async function() {
            const transaction = await Transaction.findOne({ user: testUserId });
            request(app)
                .delete(`/transactions/${transaction._id}`)
                .set('Authorization', `Bearer ${testToken}`)
                .expect(200);
        });

        it('should return 404 Not Found for non-existent transaction', function(done) {
            request(app)
                .delete('/transactions/nonexistent_id')
                .set('Authorization', `Bearer ${testToken}`)
                .expect(404, done);
        });
    });
});

after(async function() {
    // clean up any test data created during tests
    await Transaction.deleteMany({ user: testUserId });
});

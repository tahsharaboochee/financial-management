const request = require('supertest');
const app = require('../server');
const { setupTestUser, cleanupTestData } = require('./testSetup');
const Transaction = require('../models/transaction');
const expect = require('chai').expect;
const { ObjectId } = require('mongodb');

before(async function() {
    const setupResult = await setupTestUser();
    testUserId = setupResult.testUserId;
    testToken = setupResult.testToken;
});

describe('Transaction Tests', function() {
    describe('POST /transactions', function() {
        it('should require authentication', function(done) {
            request(app)
                .post('/transactions')
                .send({ type: 'income', amount: 100, category: 'salary' })
                .expect(401)
                .end(function(err, res) {
                    expect(res.body).to.have.property('error').that.equals('Please authenticate.');
                    done(err);
                });
        });        
    });

    describe('PATCH /transactions/:id', function() {
        it('should require authentication', function(done) {
            request(app)
                .patch('/transactions/123')
                .expect(401, done);
        });

        it('should update an existing transaction when authenticated', async function() {
            request(app)
                .patch(`/transactions/${testUserId}`)
                .set('Authorization', `Bearer ${testToken}`)
                .send({ amount: 200 })
                .expect(200);
        });
    });

    describe('DELETE /transactions/:id', function() {
        it('should require authentication', function(done) {
            request(app)
                .delete('/transactions/123')
                .expect(401, done);
        });

        it('should delete an existing transaction when authenticated', async function() {
            request(app)
                .delete(`/transactions/${testUserId}`)
                .set('Authorization', `Bearer ${testToken}`)
                .expect(200);
        });
    });
});

after(async function() {
    // clean up any test data created during tests
    await cleanupTestData();
});

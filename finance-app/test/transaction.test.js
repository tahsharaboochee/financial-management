const request = require('supertest');
const app = require('../server');
const { setupTestUser, testToken, testUserId, cleanupTestData } = require('./testSetup');
const Transaction = require('../models/transaction');
const expect = require('chai').expect;

before(async function() {
    await setupTestUser();
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

//     describe('DELETE /transactions/:id', function() {
//         it('should require authentication', function(done) {
//             request(app)
//                 .delete('/transactions/123')
//                 .expect(401, done);
//         });

//         it('should delete an existing transaction when authenticated', async function() {
//             const transaction = await Transaction.findOne({ user: testUserId });
//             request(app)
//                 .delete(`/transactions/${transaction._id}`)
//                 .set('Authorization', `Bearer ${testToken}`)
//                 .expect(200);
//         });

//         it('should return 404 Not Found for non-existent transaction', function(done) {
//             request(app)
//                 .delete('/transactions/nonexistent_id')
//                 .set('Authorization', `Bearer ${testToken}`)
//                 .expect(404, done);
//         });
//     });
});

after(async function() {
    // clean up any test data created during tests
    await cleanupTestData();
});

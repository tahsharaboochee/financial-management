const request = require('supertest');
const app = require('../server');
const { setupTestUser, testToken } = require('./testSetup');
const Goal = require('../models/goal');
const expect = require('chai').expect;

let createdGoalId;

before(async function() {
    await setupTestUser();
});

describe('Goals Routes', function() {
    describe('POST /goals', function() {
        it('should require authentication', function(done) {
            request(app)
                .post('/goals')
                .send({ description: 'New Goal', targetAmount: 1000, currentAmount: 0, deadline: '2025-12-31' })
                .expect(401, done);
        });

        it('should create a new goal when authenticated', function(done) {
            request(app)
                .post('/goals')
                .set('Authorization', `Bearer ${testToken}`)
                .send({ description: 'New Goal', targetAmount: 1000, currentAmount: 0, deadline: '2025-12-31' })
                .expect(201)
                .end(function(err, res) {
                    expect(res.body).to.have.property('_id');
                    createdGoalId = res.body._id;
                    done(err);
                });
        });
    });

    describe('GET /goals', function() {
        it('should require authentication', function(done) {
            request(app)
                .get('/goals')
                .expect(401, done);
        });

        it('should retrieve all goals for the logged-in user', function(done) {
            request(app)
                .get('/goals')
                .set('Authorization', `Bearer ${testToken}`)
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.an('array');
                    done(err);
                });
        });
    });

    describe('PATCH /goals/:id', function() {
        it('should require authentication', function(done) {
            request(app)
                .patch(`/goals/${createdGoalId}`)
                .send({ description: 'Updated Goal' })
                .expect(401, done);
        });

        it('should update a specific goal when authenticated', function(done) {
            request(app)
                .patch(`/goals/${createdGoalId}`)
                .set('Authorization', `Bearer ${testToken}`)
                .send({ description: 'Updated Goal' })
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.have.property('_id', createdGoalId);
                    expect(res.body.description).to.equal('Updated Goal');
                    done(err);
                });
        });
    });

    describe('DELETE /goals/:id', function() {
        it('should require authentication', function(done) {
            request(app)
                .delete(`/goals/${createdGoalId}`)
                .expect(401, done);
        });

        it('should delete a specific goal when authenticated', function(done) {
            request(app)
                .delete(`/goals/${createdGoalId}`)
                .set('Authorization', `Bearer ${testToken}`)
                .expect(200, done);
        });
    });
});

after(async function() {
    // Clean up any test data created during tests
    await Goal.deleteOne({ _id: createdGoalId });
});

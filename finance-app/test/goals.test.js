const request = require('supertest');
const app = require('../server');
const { setupTestUser, cleanupTestData } = require('./testSetup');
const Goal = require('../models/goal');
const expect = require('chai').expect;

let testUserId, testToken, createdGoalId;

before(async function() {
    await cleanupTestData(); // Ensure clean state before tests
    const setupResult = await setupTestUser();
    testUserId = setupResult.testUserId;
    testToken = setupResult.testToken;
});

after(async function() {
    await cleanupTestData(); // Clean up any test data after tests
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
                    if (err) return done(err);
                    expect(res.body).to.have.property('_id');
                    createdGoalId = res.body._id;
                    done();
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
                .end(async function(err, res) {
                    if (err) {
                        console.error('Error:', err);
                        return done(err);
                    }
                    console.log('Response Body:', res.body); // Add logging to help debug
                    expect(res.body).to.be.an('array');

                    // Fetch goals directly from the database for verification
                    const goalsInDb = await Goal.find({ user: testUserId });
                    console.log('Goals in Database:', goalsInDb);

                    // Ensure the response matches the goals in the database
                    expect(res.body.length).to.equal(goalsInDb.length);
                    res.body.forEach(goal => {
                        const goalInDb = goalsInDb.find(g => g._id.toString() === goal._id);
                        expect(goalInDb).to.not.be.undefined;
                        expect(goal.description).to.equal(goalInDb.description);
                    });

                    done();
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
                    if (err) return done(err);
                    expect(res.body).to.have.property('_id', createdGoalId);
                    expect(res.body.description).to.equal('Updated Goal');
                    done();
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

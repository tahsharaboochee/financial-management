const request = require('supertest');
const app = require('../server');
const { setupTestUser, cleanupTestData } = require('./testSetup');
const expect = require('chai').expect;

before(async function() {
    const setupResult = await setupTestUser();
    testToken = setupResult.testToken;
});

describe('Insights Routes', function() {
    describe('GET /spending-by-category', function() {
        it('should require authentication', function(done) {
            request(app)
                .get('/insights/spending-by-category')
                .expect(401, done);
        });

        it('should return spending by category when authenticated', async function() {
            request(app)
                .get('/insights/spending-by-category')
                .set('Authorization', `Bearer ${testToken}`) // Set Authorization header with test token
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.an('array'); // Assuming the response is an array
                    done(err);
                });
        });
    });

    describe('GET /income-vs-expenses', function() {
        it('should require authentication', function(done) {
            request(app)
                .get('/insights/income-vs-expenses')
                .expect(401, done);
        });

        it('should return income vs expenses over time when authenticated', async function() {
            request(app)
                .get('/insights/income-vs-expenses')
                .set('Authorization', `Bearer ${testToken}`) // Set Authorization header with test token
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.an('array'); // Assuming the response is an array
                    done(err);
                });
        });
    });

    describe('GET /goals-progress', function() {
        it('should require authentication', function(done) {
            request(app)
                .get('/insights/goals-progress')
                .expect(401, done);
        });

        it('should return progress towards financial goals when authenticated', async function() {
            request(app)
                .get('/insights/goals-progress')
                .set('Authorization', `Bearer ${testToken}`) // Set Authorization header with test token
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.be.an('array'); // Assuming the response is an array
                    done(err);
                });
        });
    });
});

after(async function() {
    // clean up any test data created during tests
    await cleanupTestData();
});

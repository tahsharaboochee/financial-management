const request = require('supertest');
const app = require('../server');
const { setupTestUser, cleanupTestData } = require('./testSetup');
const expect = require('chai').expect;

let testToken;

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

        it('should return spending by category when authenticated', function(done) {
            request(app)
                .get('/insights/spending-by-category')
                .set('Authorization', `Bearer ${testToken}`)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('GET /income-vs-expenses', function() {
        it('should require authentication', function(done) {
            request(app)
                .get('/insights/income-vs-expenses')
                .expect(401, done);
        });

        it('should return income vs expenses over time when authenticated', function(done) {
            request(app)
                .get('/insights/income-vs-expenses')
                .set('Authorization', `Bearer ${testToken}`)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('GET /goals-progress', function() {
        it('should require authentication', function(done) {
            request(app)
                .get('/insights/goals-progress')
                .expect(401, done);
        });

        it('should return progress towards financial goals when authenticated', function(done) {
            request(app)
                .get('/insights/goals-progress')
                .set('Authorization', `Bearer ${testToken}`)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });
});

after(async function() {
    await cleanupTestData();
});

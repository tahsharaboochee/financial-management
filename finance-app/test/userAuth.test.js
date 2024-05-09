const request = require('supertest');
const app = require('../server'); 
const expect = require('chai').expect;
const { setupTestUser, cleanupTestData } = require('./testSetup');

let testToken;

before(async function() {
    const setupResult = await setupTestUser();
    testUserId = setupResult.testUserId;
    testToken = setupResult.testToken;
});

describe('User Authentication Tests', function() {
    it('should authenticate user with correct credentials', function(done) {
        request(app)
            .post('/users/login')
            .send({ email: 'testuser@example.com', password: 'Password123' })
            .expect(200)
            .end(function(err, res) {
                expect(res.body).to.have.property('token');
                done(err);
            });
    });

    it('should reject login with incorrect password', function(done) {
        request(app)
            .post('/users/login')
            .send({ email: 'testuser@example.com', password: 'wrongPassword' })
            .expect(401, done); // 401 Unauthorized
    });
});

after(async function() {
    // clean up any test data created during tests
    await cleanupTestData();
});

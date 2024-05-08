const request = require('supertest');
const app = require('../server'); 
const expect = require('chai').expect;
const User = require('../models/User');
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
    // clean up the test user
    await User.deleteOne({ email: 'testuser@example.com' });
});

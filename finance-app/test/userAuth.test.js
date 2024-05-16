const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { setupTestUser, cleanupTestData } = require('./testSetup');
const server = require('../server');

chai.use(chaiHttp);
const { expect } = chai;

describe('User Authentication Routes', () => {
    let user, token;

    before(async () => {
        await cleanupTestData(); // Clean up any test data before starting tests
        ({ user, testToken: token } = await setupTestUser());
    });

    after(async () => {
        await cleanupTestData(); // Clean up test data after all tests
    });

    describe('POST /users/register', () => {
        it('should register a new user', (done) => {
            chai.request(server)
                .post('/users/register')
                .send({
                    username: 'newUser',
                    email: 'newuser@example.com',
                    password: 'NewPass123'
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('user');
                    expect(res.body.user).to.have.property('tokens');
                    done();
                });
        });

        it('should not register a user with duplicate email', (done) => {
            chai.request(server)
                .post('/users/register')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'Password123'
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
    });

    describe('POST /users/login', () => {
        it('should login an existing user', (done) => {
            chai.request(server)
                .post('/users/login')
                .send({
                    email: 'testuser@example.com',
                    password: 'Password123'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('user');
                    expect(res.body.user).to.have.property('tokens');
                    done();
                });
        });

        it('should not login with incorrect password', (done) => {
            chai.request(server)
                .post('/users/login')
                .send({
                    email: 'testuser@example.com',
                    password: 'wrongPassword'
                })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
    });
});

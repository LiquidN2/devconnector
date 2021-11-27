const { assert, expect } = require('chai');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('./../../../server');
const User = require('./../../../models/User');

const { seedUsers, populateUsers } = require('./seed/user');

beforeEach(populateUsers);

describe('POST /api/users/login', function() {
    const timeout = 3000;

    it('should login with correct user credentials', function(done) {
        this.timeout(timeout);

        const { email, password } = seedUsers[0];

        request(app)
            .post('/api/users/login')
            .send({ email, password })
            .expect(200)
            .expect(res => {
                assert.isTrue(res.body.success);
                assert.exists(res.body.token);
                assert.isString(res.body.token);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                
                done();
            });
    });

    it('should not login with incorrect user credentials', function(done) {
        this.timeout(timeout);

        const email = 'test@email.com';
        const password = 'Test1234';

        request(app)
            .post('/api/users/login')
            .send({ email, password })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should not login with invalid email', function(done) {
        this.timeout(timeout);

        const email = 'johndoe@example';
        const password = 'userOnePass';

        request(app)
            .post('/api/users/login')
            .send({ email, password })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should not login with missing email', function(done) {
        this.timeout(timeout);

        const { password } = seedUsers[0];

        request(app)
            .post('/api/users/login')
            .send({ password })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should not login with missing password', function(done) {
        this.timeout(timeout);

        const { email } = seedUsers[0];


        request(app)
            .post('/api/users/login')
            .send({ email })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});


describe('POST /api/users/register', function() {
    const timeout = 3000;

    it('should register new user', function(done) {
        this.timeout(timeout);

        const name = 'Hugh Nguyen';
        const email = 'me@hnguyen.io';
        const password = 'Abcd1234';
        const password2 = 'Abcd1234';

        request(app)
            .post('/api/users/register')
            .send({ name, email, password, password2 })
            .expect(201)
            .expect(res => {
                assert.equal(res.body.name, name);
                assert.equal(res.body.email, email);
                assert.isString(res.body.avatar);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findOne({ email })
                    .then(user => {
                        if(!user) {
                            return Promise.reject('no user found');
                        }

                        assert.equal(user.email, email);
                        assert.equal(user.name, name);
                        done();
                    })
                    .catch(err => done(err));
            });
    });

    it('should not register existing user', function(done) {
        this.timeout(timeout);
        const { name, email, password } = seedUsers[0];
        const password2 = seedUsers[0].password;

        request(app)
            .post('/api/users/register')
            .send({ name, email, password, password2 })
            .expect(400)
            .expect(res => {
                assert.equal(res.body.email, 'Email already exists');
            })
            .end((err, res) => {
                if (err) {
                return done(err);
                }
                done();
            });
    });
    
    it('should not register invalid name', function(done) {
        this.timeout(timeout);
        const name = 'H';
        const { email, password } = seedUsers[0];
        const password2 = seedUsers[0].password;

        request(app)
            .post('/api/users/register')
            .send({ name, email, password, password2 })
            .expect(400)
            .expect(res => {
                assert.equal(res.body.name, 'Name must be between 2 and 30 characters');
            })
            .end((err, res) => {
                if (err) {
                return done(err);
                }
                done();
            });
    });

    it('should not register invalid email', function(done) {
        this.timeout(timeout);
        const email = 'test@gmail';
        const { name, password } = seedUsers[0];
        const password2 = seedUsers[0].password;

        request(app)
            .post('/api/users/register')
            .send({ name, email, password, password2 })
            .expect(400)
            .expect(res => {
                assert.equal(res.body.email, 'Invalid email address');
            })
            .end((err, res) => {
                if (err) {
                return done(err);
                }
                done();
            });
    });

    it('should not register if password does not meet requirement', function(done) {
        this.timeout(timeout);
        const { name, email } = seedUsers[0];
        const password = 'abc';
        const password2 = password;

        request(app)
            .post('/api/users/register')
            .send({ name, email, password, password2 })
            .expect(400)
            .expect(res => {
                assert.equal(
                    res.body.password, 
                    'Password must be at least 8 characters long containing 1 uppercase letter, 1 lowercase letter, 1 number'
                );
            })
            .end((err, res) => {
                if (err) {
                return done(err);
                }
                done();
            });
    });

    it('should not register if password and confirm password are not the same', function(done) {
        this.timeout(timeout);

        const name = 'Hugh Nguyen';
        const email = 'me@hnguyen.io';
        const password = 'Abcd1234';
        const password2 = 'Abcd1235';

        request(app)
            .post('/api/users/register')
            .send({ name, email, password, password2 })
            .expect(400)
            .expect(res => {
                assert.equal(res.body.password2, 'Passwords must match');
            })
            .end((err, res) => {
                if (err) {
                return done(err);
                }
                done();
            });
    });
        
});


describe('GET /api/users/current', function() {
    it('should return user if authenticated', function(done) {
        const payload = { 
            _id: seedUsers[0]._id.toHexString(),
            email: seedUsers[0].email
        };
        const secret = process.env.JWT_SECRET;
        
        jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
            const generatedToken = `Bearer ${token}`;

            request(app)
                .get('/api/users/current')
                .set('Authorization', generatedToken)
                .expect(200)
                .expect(res => {
                    assert.equal(res.body.email, seedUsers[0].email);
                })
                .end((err, res) => {
                    if (err) {
                    return done(err);
                    }
                done();
            });

        });
    });

    it('should not return user if not authenticated', function(done) {
        const payload = { 
            _id: seedUsers[0]._id.toHexString(),
            email: 'someemail@me.com'
        };
        const secret = process.env.JWT_SECRET;
        
        jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
            const generatedToken = `Bearer ${token}`;

            request(app)
                .get('/api/users/current')
                .set('Authorization', generatedToken)
                .expect(401)
                .end((err, res) => {
                    if (err) {
                    return done(err);
                    }
                done();
            });

        });
    });

});
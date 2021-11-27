const { ObjectID } = require('mongodb');

const User = require('./../../../../models/User');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const seedUsers = [
    {
        _id: userOneId,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'JohnDoe1234',
    }, {
        _id: userTwoId,
        name: 'Adam Smith',
        email: 'adamsmith@test.net',
        password: 'AdamSmith4321',
    }
];

const timeOut = 5000;

const populateUsers = function(done) {
    this.timeout(timeOut);
    User.remove({})
        .then(() => {
            const userOne = new User(seedUsers[0]).save();
            const userTwo = new User(seedUsers[1]).save();

            return Promise.all([userOne, userTwo]);
        })
        .then(() => done())
        .catch(err => done(err));
};

const clearUsers = function(done) {
    
}

module.exports = { seedUsers, populateUsers };
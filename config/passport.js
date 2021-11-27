const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('./../server/models/User');
// const keys = require('./keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// options.secretOrKey = keys.secretOrKey;
options.secretOrKey = process.env.JWT_SECRET;

const verify = (jwt_payload, done) => {
    // decode jwt to get payload data (_id and email)
    const { _id } = jwt_payload;

    // find existing user in DB using decoded _id and email
    User.findById(_id)
        .then(user => {
            if (user) {
                return done(null, user);
            }

            return done(null, false);
        })
        .catch(err => console.log(err));
};

const configurePassport = passport => {
    passport.use(new JwtStrategy(options, verify));
};

module.exports = configurePassport;
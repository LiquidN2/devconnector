const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },

  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },

  password: {
    type: String,
    required: true
  },

  avatar: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  },

  tokens: [{
    token: {
      type: String
    }
  }]
});

// userSchema.methods.toJSON = function() {
//     const user = this;
//     const { _id, email, name } = user;
//     return { _id, email, name };
// };

userSchema.methods.generateToken = function () {
  const user = this;

  const payload = {
    _id: user._id.toHexString()
    // ,email: user.email
  };

  const secretOrPrivateKey = process.env.JWT_SECRET;

  const options = { expiresIn: process.env.JWT_EXPIRE_IN };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
      if (err) {
        return reject();
      }
      return resolve(token);
      // user.tokens.push({ token });
      // user.save().then(() => {
      //     return resolve(token);
      // })
    });
  });
};

userSchema.statics.findByCredential = function (email, password) {
  const User = this;
  let errors = {};

  return User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'Email not found. Please sign up or try another email';
        return Promise.reject(errors);
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if (err || !res) {
            errors.password = 'Incorrect password';
            return reject(errors);
          }

          return resolve(user);
        });
      });
    });

  // let foundUser;
  // return new Promise((resolve, reject) => {
  //     User.findOne({ email })
  //         .then(user => {
  //             if(!user) {
  //                 errors.email = 'Email not found. Please sign up or try another email';
  //                 return reject(errors);
  //             } else {
  //                 foundUser = user;
  //                 return bcrypt.compare(password, user.password);
  //             }
  //         })
  //         .then(passwordIsMatch => {
  //             if (!passwordIsMatch) {
  //                 errors.password = 'Incorrect password';
  //                 return reject(errors);
  //             }

  //             return resolve(foundUser);
  //         })
  //         .catch(err => reject());
  // });

};

userSchema.pre('save', function (next) {
  const user = this;

  // password encryption
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (!err) {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (!err) {
            user.password = hash;
            next();
          }
        });
      }
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
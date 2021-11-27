const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateLoginInput = data => {
  let errors = {};

  // email validation
  if (isEmpty(data.email)) {
    errors.email = 'Email must be provided';
  } else {
    data.email = data.email.trim();
    if (!validator.isEmail(data.email)) {
      errors.email = 'Invalid email address';
    }
  }

  // password validation
  if (isEmpty(data.password)) {
    errors.password = 'Password must be provided';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLoginInput;
const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateRegisterInput = data => {
  let errors = {};

  // name validation
  if (isEmpty(data.name)) {
    errors.name = 'Name must be provided';
  } else {
    data.name = data.name.trim();
    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
      errors.name = 'Name must be between 2 and 30 characters';
    }
  }

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
  } else if (!validator.matches(data.password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
    errors.password = 'Password must be at least 8 characters long containing 1 uppercase letter, 1 lowercase letter, 1 number';
  }

  // password2 validation
  if (isEmpty(data.password2)) {
    errors.password2 = 'Password confirm must be provided';
  } else if (!validator.matches(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateRegisterInput;
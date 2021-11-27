const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateQueryInput = queryText => {
  let errors = {};
    
    // text validation
    if (isEmpty(queryText)) {
        errors.query = 'Must provide query';
    } else if (!validator.matches(queryText, /^[a-z\d\-_\s]+$/i)) {
        errors.query = 'Query must contain only letters, numbers and spaces';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

module.exports = validateQueryInput;
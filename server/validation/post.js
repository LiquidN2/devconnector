const validator = require('validator');
const isEmpty = require('./isEmpty');

const validatePostInput = data => {
    let errors = {};
    
    // text validation
    if (isEmpty(data.text)) {
        errors.text = 'Must provide post text';
    } else if (!validator.isLength(data.text, { min: 1, max: 300 })) {
        errors.text = 'Post text length must be between 1 and 300 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validatePostInput;
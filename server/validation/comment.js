const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateCommentInput = data => {
    let errors = {};
    
    // text validation
    if (isEmpty(data.text)) {
        errors.text = 'Must provide post comment text';
    } else if (!validator.isLength(data.text, { min: 1, max: 300 })) {
        errors.text = 'post comment text length must be between 1 and 300 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateCommentInput;
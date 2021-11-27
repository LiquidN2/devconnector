// const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateExperienceInput = data => {
    let errors = {};
    
    // title validation
    if (isEmpty(data.title)) {
        errors.title = 'Must provide title';
    }

    // company validation
    if (isEmpty(data.company)) {
        errors.company = 'Must provide company name';
    }

    // title validation
    if (isEmpty(data.from)) {
        errors.from = 'Must provide job start date';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateExperienceInput;
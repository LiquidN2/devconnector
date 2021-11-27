// const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateEducationInput = data => {
    let errors = {};
    
    // school validation
    if (isEmpty(data.school)) {
        errors.school = 'Must provide school name';
    }

    // degree validation
    if (isEmpty(data.degree)) {
        errors.degree = 'Must provide degree';
    }

    // fieldOfStudy validation
    if (isEmpty(data.fieldOfStudy)) {
        errors.fieldOfStudy = 'Must provide field of study';
    }

    // start time validation
    if (isEmpty(data.from)) {
        errors.from = 'Must provide job start date';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateEducationInput;
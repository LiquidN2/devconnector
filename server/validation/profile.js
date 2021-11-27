const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateProfileInput = data => {
    let errors = {};
    
    // handle validation
    if (isEmpty(data.handle)) {
        errors.handle = 'Handle must be provided.';
    } else {
        data.handle = data.handle.trim();
        if (!validator.isLength(data.handle, { min: 1, max: 40 })) {
            errors.handle = 'Handle must be between 1 and 40 characters.';
        }
        if (!validator.isAlphanumeric(data.handle, ['en-AU'])) {
            const errorMsg = 'Handle must contains only letters and numbers.';
            if (errors.handle) {
                errors.handle = errors.handle + ' ' + errorMsg;
            } else {
                errors.handle = errorMsg;
            }
        }
    }
    
    // status validation
    if (isEmpty(data.status)) {
        errors.status = 'Status must be provided';
    }

    // skills validation
    if (isEmpty(data.skills)) {
        errors.skills = 'Skills must be provided';
    }

    // webiste URL validation
    if (!isEmpty(data.website)) {
        if (!validator.isURL(data.website)) {
            errors.website = 'Invalid website URL';
        }
    }

    // youtube URL validation
    if (!isEmpty(data.youtube)) {
        if (!validator.isURL(data.youtube)) {
            errors.youtube = 'Invalid youtube URL';
        }
    }

    // facebook URL validation
    if (!isEmpty(data.facebook)) {
        if (!validator.isURL(data.facebook)) {
            errors.facebook = 'Invalid facebook URL';
        }
    }

    // twitter URL validation
    if (!isEmpty(data.twitter)) {
        if (!validator.isURL(data.twitter)) {
            errors.twitter = 'Invalid twitter URL';
        }
    }

    // linkedin URL validation
    if (!isEmpty(data.linkedin)) {
        if (!validator.isURL(data.linkedin)) {
            errors.linkedin = 'Invalid linkedin URL';
        }
    }

    // instagram URL validation
    if (!isEmpty(data.instagram)) {
        if (!validator.isURL(data.instagram)) {
            errors.instagram = 'Invalid instagram URL';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateProfileInput;
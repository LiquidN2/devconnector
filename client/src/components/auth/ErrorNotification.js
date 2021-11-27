import React from 'react';
import PropTypes from 'prop-types';

const ErrorNotification = props => {
    let errors = [];
    
    for (const errorName in props.errors) {
        errors.push(props.errors[errorName]);
    }

    return (
        <div className="form-validation">
            {
                errors.map(error => {
                    return <p className="form-validation__text" key={error}>{error}</p>
                })
            }
        </div>
    );
};

ErrorNotification.propTypes = {
    errors: PropTypes.object.isRequired
};

export default ErrorNotification;
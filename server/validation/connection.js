const isEmpty = require('./isEmpty');

const validateConnectionRequest = data => {
  let errors = {};

  // password validation
  if (isEmpty(data.userId)) {
    errors.userId = 'User id must be provided';
  }

  if (data.profileId && data.selfProfileId && data.profileId === data.selfProfileId) {
    errors.profileId = 'Profile ids must be different';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateConnectionRequest;

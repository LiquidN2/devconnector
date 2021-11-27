const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateMessageInput = data => {
  let errors = {};

  // text validation
  if (isEmpty(data.text)) {
    errors.text = 'Must provide message text';
  } else if (!validator.isLength(data.text, { min: 1, max: 300 })) {
    errors.text = 'Message text length must be between 1 and 300 characters';
  }

  // if (isEmpty(data.roomId)) {
  //   errors.roomId = 'Must provide roomId';
  // } else if (!validator.isMongoId(data.roomId)) {
  //   errors.roomId = 'RoomId must be mongoId format';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateMessageInput;
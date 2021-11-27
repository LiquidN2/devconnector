const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User' // works like joining tables
  },

  text: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  },

  roomId: {
    type: Schema.Types.ObjectId
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
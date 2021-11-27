const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  connections: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    }

    // connected: {
    //   type: Boolean,
    //   default: false
    // },

    // selfInitiated: {
    //   type: Boolean
    // }
  }],

  pendingRequestFrom: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    }
  }],

  pendingRequestTo: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    }
  }]


});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;
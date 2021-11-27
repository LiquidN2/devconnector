const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const roomSchema = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User'
//   },

//   rooms: [{
//     roomId: {
//       type: Schema.Types.ObjectId
//     },
    
//     // user in the same room
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: 'User' 
//     }
//   }]
// });

const roomSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  
  roomType: {
    type: String
  },

  members: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
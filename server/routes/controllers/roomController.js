const { ObjectID } = require('mongodb');

// Load DB models
const Room = require('./../../models/Room');

const roomCreate = (req, res) => {
  const userId = req.user._id;
  const { targetUserId, roomType } = req.body;

  Room.findOne({
    roomType,
    "members.user": {
      $all: [ userId, targetUserId ]
    }
  }).then(room => {
    if (room) {
      // return existing room
      res.json(room);
    } else {
      // create new room
      const newRoom = new Room({
        roomType,
        members: [
          { user: userId },
          { user: targetUserId }
        ]
      });
      return newRoom.save();
    }
  }).then(room => {
    // return newly created room
    res.json(room);
  }).catch(err => res.status(400).send());
};


const roomGet = (req, res) => {
  const errors = {};
  const userId = req.user._id;
  const { targetUserId, roomType } = req.query;

  let queryCondition;

  if(!targetUserId) {
    queryCondition = {
      roomType,
      "members.user": userId
    };
  } else {
    queryCondition = {
      roomType,
      "members.user": {
        $all: [ userId, targetUserId ]
      }
    };
  }

  Room.find(queryCondition)
    .populate('members.user', ['name', 'email', 'avatar'])
    .then(rooms => {
      if (rooms) {
        // return existing room
        // res.json(rooms);

        let newArr = [];

        rooms.forEach(room => {
          const { _id, date, roomType, members } = room;
          
          // only get the target user 
          const withUser = members.find(member => {
            return member.user._id.toHexString() !== userId.toHexString();
          });
          
          newArr.push({
            _id, 
            date, 
            roomType, 
            withUserId: withUser.user
          });
        });

        res.json(newArr);
      } else {
        errors.room = "room does not exist";
        res.status(404).json(errors);
      }
    })
    .catch(err => res.status(400).send());

};


const roomByIdGet = (req, res) => {
  const errors = {};
  const userId = req.user._id;
  const { roomId } = req.params;

  Room.findById(roomId).then(room => {
    if(!room) {
      errors.room = "room does not exist";
      res.status(404).json(errors);
    } else {
      res.json(room);
    }
  }).catch(err => res.status(400).send());
};

module.exports = { 
  roomCreate,
  roomByIdGet,
  roomGet
};
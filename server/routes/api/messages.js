const passport = require('passport');
const express = require('express');

const messageController = require('../controllers/messageController');

const router = express.Router();

// @route   GET api/messages/test
// @desc    Test messages route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Message works" }));

// @route   POST api/messages
// @desc    Create new message
// @access  Public
router.post(
  '/', 
  passport.authenticate('jwt', { session: false }),
  messageController.messageCreate
);

// @route   POST api/messages
// @desc    Create new message
// @access  Public
router.post(
  '/many', 
  passport.authenticate('jwt', { session: false }),
  messageController.messageSaveMany
);

// @route   GET api/messages/room/:roomId
// @desc    Get All messages from a room
// @access  Public
router.get(
  '/room/:roomId', 
  passport.authenticate('jwt', { session: false }),
  messageController.messageByRoomIdGet
);

// @route   GET api/messages/latest/room/:roomId
// @desc    Get All messages from a room
// @access  Public
router.get(
  '/latest/room/:roomId', 
  passport.authenticate('jwt', { session: false }),
  messageController.messageLatestByRoomIdGet
);


module.exports = router;
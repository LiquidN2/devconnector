const passport = require('passport');
const express = require('express');

const roomController = require('../controllers/roomController');

const router = express.Router();

// @route   GET api/rooms/test
// @desc    Test rooms route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Room works" }));

// @route   POST api/rooms
// @desc    create new room
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  roomController.roomCreate
);

// @route   GET api/rooms?roomType="oneonone"&targetuserId="targetUserId"
// @desc    get room by room type and target userId
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  roomController.roomGet
);

module.exports = router;
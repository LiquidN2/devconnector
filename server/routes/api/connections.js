const passport = require('passport');
const express = require('express');

const router = express.Router();

const connectionController = require('./../controllers/connectionController');

// @route   GET api/connections/test
// @desc    Test connections route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Connections works" }));

// @route   GET api/connections
// @desc    get connections for current user
// @access  Private
router.get(
  '/', 
  passport.authenticate('jwt', { session: false }),
  connectionController.connectionGet
);

// @route   GET api/connections/count
// @desc    get number of connections
// @access  Private
router.get(
  '/count', 
  passport.authenticate('jwt', { session: false }),
  connectionController.connectionCountGet
);

// @route   GET api/connections/count/user/:userId
// @desc    get number of connections by userID
// @access  Private
router.get(
  '/count/user/:userId', 
  passport.authenticate('jwt', { session: false }),
  connectionController.connectionCountByUserIdGet
);


// @route   GET api/connections/pending
// @desc    get pending connections
// @access  Private
router.get(
  '/pending', 
  passport.authenticate('jwt', { session: false }),
  connectionController.pendingRequestGet
);

// @route   GET api/connections/countpending
// @desc    get number of pending connection request
// @access  Private
router.get(
  '/countpending', 
  passport.authenticate('jwt', { session: false }),
  connectionController.pendingRequestCountGet
);

// @route   GET api/connections/status/:userId
// @desc    get connection status with user Id
// @access  Private
router.get(
  '/status/user/:userId', 
  passport.authenticate('jwt', { session: false }),
  connectionController.connectionStatusGet
);

// @route   POST api/connections
// @desc    request new connection for current user
// @access  Private
router.post(
  '/', 
  passport.authenticate('jwt', { session: false }),
  connectionController.connectionAdd
);

// @route   DELETE api/connections
// @desc    remove existing connection for current user
// @access  Private
router.delete(
  '/', 
  passport.authenticate('jwt', { session: false }),
  connectionController.conenctionRemove
);

// @route   PATCH api/connections/approve
// @desc    approve connection request
// @access  Private
router.patch(
  '/approve', 
  passport.authenticate('jwt', { session: false }),
  connectionController.connectionApprove
);

// @route   PATCH api/connections/decline
// @desc    decline connection request
// @access  Private
router.patch(
  '/decline', 
  passport.authenticate('jwt', { session: false }),
  connectionController.connectionDecline
);

module.exports = router;
const express = require('express');
const passport = require('passport');

const router = express.Router();

// Load User Controllers
const userController = require('./../controllers/userController');

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "User works" }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', userController.userRegister)

// @route   POST api/users/login
// @desc    Login User / Return JWT
// @access  Public
router.post('/login', userController.userLogin);

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current', 
  passport.authenticate('jwt', { session: false }), 
  userController.userCurrentGet
);


module.exports = router;
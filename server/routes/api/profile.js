const passport = require('passport');
const express = require('express');

// Load Profile Controllers
const profileController = require('./../controllers/profileController');
const experienceController = require('./../controllers/experienceController');
const educationController = require('./../controllers/educationController');

const router = express.Router();

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Profile works"}));

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    profileController.profileCurrentGet
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', profileController.profileAllGet);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', profileController.profileByHandleGet);

// @route   GET api/profile/user/:userId
// @desc    Get profile by user id
// @access  Public
router.get('/user/:userId', profileController.profileByUserIdGet);

// @route   POST api/profile
// @desc    Create new user profile / Update existing profile (excluding experience and education)
// @access  Private
router.post(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    profileController.profileCreatePost    
);

// @route   GET api/profile/experience/:experienceId
// @desc    Get experience by id
// @access  Private
router.get(
    '/experience/:experienceId', 
    passport.authenticate('jwt', { session: false }), 
    experienceController.experienceByIdGet
);

// @route   GET api/profile/experience
// @desc    Get all experiences based on token
// @access  Private
router.get(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    experienceController.experienceAllGet
);

// @route   POST api/profile/experience
// @desc    Create new experience in profile
// @access  Private
router.post(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    experienceController.experienceCreate
);

// @route   DELETE api/profile/experience/:experienceId
// @desc    Delete experience by id
// @access  Private
router.delete(
    '/experience/:experienceId',
    passport.authenticate('jwt', { session: false }), 
    experienceController.experienceByIdDelete
);

// @route   PATCH api/profile/experience/:experienceId
// @desc    Edit experience by id
// @access  Private
router.patch(
    '/experience/:experienceId',
    passport.authenticate('jwt', { session: false }),
    experienceController.experienceByIdUpdate
);

// @route   POST api/profile/education
// @desc    Create new education in profile
// @access  Private
router.post(
    '/education',
    passport.authenticate('jwt', { session: false }),
    educationController.educationCreate
);

// @route   DELETE api/profile/education/:educationId
// @desc    Delete education by education id
// @access  Private
router.delete(
    '/education/:educationId',
    passport.authenticate('jwt', { session: false }),
    educationController.educationByIdDelete
);

// @route   PATCH api/profile/education/:educationId
// @desc    Update education by education id
// @access  Private
router.patch(
    '/education/:educationId',
    passport.authenticate('jwt', { session: false }),
    educationController.educationByIdUpdate
);

// @route   GET api/profile/education/:educationId
// @desc    Get education by education id
// @access  Private
router.get(
    '/education/:educationId',
    passport.authenticate('jwt', { session: false }),
    educationController.educationByIdGet
);

// @route   GET api/profile/education/
// @desc    Get all education
// @access  Private
router.get(
    '/education',
    passport.authenticate('jwt', { session: false }),
    educationController.educationAllGet
);

module.exports = router;
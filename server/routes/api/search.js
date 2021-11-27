const passport = require('passport');
const express = require('express');

const router = express.Router();

const searchController = require('../controllers/searchController');

// @route   GET api/search/test
// @desc    Test search route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Search works"}));

// @route   GET api/search
// @desc    Get general search
// @access  Public
router.get(
  '/',
  // passport.authenticate('jwt', { session: false }),
  searchController.searchGeneral
);

module.exports = router;
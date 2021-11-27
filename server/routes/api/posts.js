const passport = require('passport');
const express = require('express');

// Load Post Controller
const postController = require('./../controllers/postController');
const postLikeController = require('./../controllers/postLikeController');
const postCommentController = require('./../controllers/postCommentController');

const router = express.Router();

// @route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Posts works!" }));

// @route   GET api/posts
// @desc    Get posts (maximum 5 post per page)
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  postController.postGet
);

// @route   GET api/posts/count
// @desc    Get number of posts of current user
// @access  Private
router.get(
  '/count',
  passport.authenticate('jwt', { session: false }),
  postController.postCountGet
);

// @route   GET api/posts/count
// @desc    Get number of posts of current user
// @access  Private
router.get(
  '/count/user/:userId',
  passport.authenticate('jwt', { session: false }),
  postController.postCountByUserIdGet
);

// @route   GET api/posts/user/:userId
// @desc    Get posts by userID (maximum 5 post per page)
// @access  Private
router.get(
  '/user/:userId',
  passport.authenticate('jwt', { session: false }),
  postController.postByUserIdGet
);

// @route   POST api/posts
// @desc    Create new post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  postController.postCreate
);

// @route   DELTE api/posts/:postId
// @desc    Delete post by id
// @access  Private
router.delete(
  '/:postId',
  passport.authenticate('jwt', { session: false }),
  postController.postByIdDelete
);

// @route   PATCH api/posts/:postId
// @desc    Update post by id
// @access  Private
router.patch(
  '/:postId',
  passport.authenticate('jwt', { session: false }),
  postController.postByIdUpdate
);

// @route   PATCH api/posts/resizedimgupdate/:postId
// @desc    Update post by id
// @access  Private
router.patch(
  '/resizedimgupdate/:postId',
  passport.authenticate('jwt', { session: false }),
  postController.postResizedImgUpdate
);


// @route   GET api/posts/:postId
// @desc    Get post by id
// @access  Private
router.get(
  '/:postId',
  passport.authenticate('jwt', { session: false }),
  postController.postByIdGet
);

// @route   POST api/posts/like/:postId
// @desc    Toggle post by id
// @access  Private
router.post(
  '/like/:postId',
  passport.authenticate('jwt', { session: false }),
  postLikeController.postLikeToggle
);

// @route   POST api/posts/comment/:postId
// @desc    Create new comment for post id
// @access  Private
router.post(
  '/comment/:postId',
  passport.authenticate('jwt', { session: false }),
  postCommentController.postCommentCreate
);

// @route   DELETE api/posts/comment/:postId/:commentId
// @desc    Delete own comment based on comment id and post id
// @access  Private
router.delete(
  '/comment/:postId/:commentId',
  passport.authenticate('jwt', { session: false }),
  postCommentController.postCommentByIdDelete
);

// @route   PATCH api/posts/comment/:postId/:commentId
// @desc    Update own comment based on comment id and post id
// @access  Private
router.patch(
  '/comment/:postId/:commentId',
  passport.authenticate('jwt', { session: false }),
  postCommentController.postCommentByIdUpdate
);

// @route   GET api/posts/comment/:postId/:commentId
// @desc    Get own comment on a post.  Will not return comment of others on the same post
// @access  Private
router.get(
  '/comment/:postId/:commentId',
  passport.authenticate('jwt', { session: false }),
  postCommentController.postCommentOwnByIdGet
);

// @route   GET api/posts/comment/:postId
// @desc    Get all comments from all users on a post Id 
// @access  Private
router.get(
  '/comment/:postId',
  passport.authenticate('jwt', { session: false }),
  postCommentController.postCommentGet
);

module.exports = router;
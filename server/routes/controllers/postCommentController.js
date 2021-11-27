// Load DB models
const Post = require('./../../models/Post');

// Load commment validator
const validateCommentInput = require('./../../validation/comment');

const postCommentCreate = (req, res) => {
  // validate comment input
  const { errors, isValid } = validateCommentInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // get userId and postId from req
  const { postId } = req.params;

  // set newComment obj
  const newComment = {};
  newComment.user = req.user._id;
  if (req.body.text) newComment.text = req.body.text.trim();
  if (req.body.name) newComment.name = req.body.name.trim();
  if (req.body.avatar) newComment.avatar = req.body.avatar.trim();

  const conditions = { _id: postId };
  const update = {
    $push: { comments: newComment }
  };
  const options = {
    new: true,
    fields: { _id: 1, comments: 1 }
  };

  // push newComment to comments
  Post.findOneAndUpdate(conditions, update, options)
    .then(post => {
      if (!post) {
        errors.nopost = 'No post found';
        return res.status(404).json(errors);
      }

      // return the newly added comment
      const lastIndex = post.comments.length - 1;
      return res.status(201).json(post.comments[lastIndex]);
    })
    .catch(err => res.status(400).send());
};

const postCommentByIdDelete = (req, res) => {
  const errors = {};

  // get userId, postId and commentId
  const userId = req.user._id;
  const { postId, commentId } = req.params;

  const conditions = {
    _id: postId,
    comments: {
      $elemMatch: {
        _id: commentId,
        user: userId
      }
    }
  };

  const update = {
    $pull: {
      comments: {
        _id: commentId,
        user: userId
      }
    }
  };

  const options = {
    new: true
  };

  Post.findByIdAndUpdate(conditions, update, options)
    .then(profile => {
      if (!profile) {
        errors.nocomment = 'No post with such comment';
        return res.status(404).json(errors);
      }

      return res.status(200).json(profile);
    })
    .catch(err => res.status(400).send(err));
};

const postCommentByIdUpdate = (req, res) => {
  // validate comment input
  const { errors, isValid } = validateCommentInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // get postId, commentId and userId
  const userId = req.user._id;
  const { postId, commentId } = req.params;

  // get updatedComment
  const updatedComment = {};
  if (req.body.text) updatedComment['comments.$.text'] = req.body.text.trim();
  if (req.body.name) updatedComment['comments.$.name'] = req.body.name.trim();
  if (req.body.avatar) updatedComment['comments.$.avatar'] = req.body.avatar.trim();

  // setup query conditions, update and options
  const conditions = {
    _id: postId,
    comments: {
      $elemMatch: {
        _id: commentId,
        user: userId
      }
    }
  };
  const update = { $set: updatedComment };
  const options = {
    new: true,
    upsert: true
  };

  // find post and update comment
  Post.findOneAndUpdate(conditions, update, options)
    .select({
      _id: 1,
      comments: {
        $elemMatch: {
          _id: commentId,
          user: userId
        }
      }
    })
    .then(post => {
      if (!post) {
        errors.nopost = 'No comment or post found';
        return res.status(404).json(errors);
      }

      return res.status(200).json(post.comments[0]);
    })
    .catch(err => res.status(400).send());
};

const postCommentByIdGet = (req, res) => {

};

const postCommentAllGet = (req, res) => {
  const errors = {};
  const { postId } = req.params;

  Post.findById(postId)
    .select({ _id: 1, comments: 1 })
    .then(post => {
      if (!post) {
        errors.nopost = 'no post found';
        return res.status(404).json(errors);
      }
      return res.status(200).json(post);
    })
    .catch(err => res.status(400).send());
};

const postCommentGet = (req, res) => {
  const errors = {};
  const { postId } = req.params;

  // pagination
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 0;
  const nPerPage = 3;
  const startCommentsIndex = pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0;
  const endCommentsIndex = startCommentsIndex + nPerPage;

  Post.findById(postId)
    .select({ _id: 1, comments: 1 })
    .then(post => {
      if (!post) {
        errors.nopost = 'no post found';
        return res.status(404).json(errors);
      }

      const comments = post.comments.filter((comment, index) => {
        if (index >= startCommentsIndex && index < endCommentsIndex) {
          return comment;
        }
      });

      return res.status(200).json(comments);
    })
    .catch(err => res.status(400).send());
};

const postCommentOwnByIdGet = (req, res) => {
  // get userId, postId and commentId
  const userId = req.user._id;
  const { postId, commentId } = req.params;

  const condition = {
    _id: postId,
    comments: {
      $elemMatch: {
        _id: commentId,
        user: userId
      }
    }
  };

  Post.findOne(condition).then(post => {
    if (!post) {
      return res.status(404).json({ msg: 'post not found' })
    }

    return res.json(post);
  }).catch(err => res.status(400).send(err))
};

module.exports = {
  postCommentCreate,
  postCommentByIdDelete,
  postCommentByIdUpdate,
  postCommentAllGet,
  postCommentGet,
  postCommentOwnByIdGet
};
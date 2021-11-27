// Load DB models
const Post = require('./../../models/Post');

// Load input validator
const validatePostInput = require('./../../validation/post');

const postGet = (req, res) => {
  const errors = {};
  const userId = req.user._id;

  // pagination
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 0;
  const nPerPage = 5;

  Post.find({ user: userId })
    // .select({ comments: 0 })
    .sort({ date: -1 })
    .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
    .limit(nPerPage)
    .then(posts => {
      if (!posts) {
        errors.post = 'No post found';
        return res.status(404).json(errors);
      }

      let postArr = [];
      posts.forEach(post => {
        const { _id, user, name, avatar, text, date, likes, comments, imageName, imageUrl, imageIsResized, resizedImageName, resizedImageUrl } = post;
        postArr.push({
          _id,
          user,
          name,
          avatar,
          text,
          likes,
          comments,
          date,
          imageName, 
          imageUrl,
          imageIsResized, 
          resizedImageName, 
          resizedImageUrl,
          numLikes: likes.length,
          numComments: comments.length
        });
      });

      return res.status(200).json(postArr);
    })
    .catch(err => res.status(400).send(err));
}

const postCountGet = (req, res) => {
  const errors = {};
  const userId = req.user._id;

  Post.countDocuments({ user: userId })
    .then(numPosts => {
      if (!numPosts) {
        errors.postCount = 'no post'
        return res.status(404).json(errors);
      }
      res.json({ numPosts });
    })
    .catch(err => res.status(400).send());
}

const postCreate = (req, res) => {
  // validate post input
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // extract fields from post req body
  const newPostFields = {};
  newPostFields.user = req.user._id;
  if (req.body.text) newPostFields.text = req.body.text.trim();
  if (req.body.name) newPostFields.name = req.body.name.trim();
  if (req.body.avatar) newPostFields.avatar = req.body.avatar.trim();
  if (req.body.imageName) newPostFields.imageName = req.body.imageName.trim();
  if (req.body.imageUrl) newPostFields.imageUrl = req.body.imageUrl.trim();

  // create post
  const newPost = new Post(newPostFields);

  newPost.save().then(post => {
    if (!post) {
      errors.nopost = 'Unable to create new post';
      return res.status(400).json(errors);
    }

    return res.status(201).json(post);
  }).catch(err => res.status(400).send());
};

const postByIdDelete = (req, res) => {
  const errors = {};
  const userId = req.user._id;
  const { postId } = req.params;

  Post.findOneAndDelete({
    _id: postId,
    user: userId
  })
    .then(post => {
      if (!post) {
        errors.nopost = 'No post found';
        return res.status(404).json(errors);
      }
      return res.status(200).json(post);
    })
    .catch(err => res.status(400).send(err));
};

const postByIdUpdate = (req, res) => {
  // validate post input
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const userId = req.user._id;
  const { postId } = req.params;

  const updatedPost = {};
  if (req.body.text) updatedPost.text = req.body.text.trim();
  if (req.body.name) updatedPost.name = req.body.name.trim();
  if (req.body.avatar) updatedPost.avatar = req.body.avatar.trim();
  if (req.body.imageName) updatedPost.imageName = req.body.imageName.trim();
  if (req.body.imageUrl) {
    updatedPost.imageUrl = req.body.imageUrl.trim();
    updatedPost.imageIsResized = false;
    updatedPost.resizedImageName = '';
    updatedPost.resizedImageUrl = '';
  }

  const conditions = {
    user: userId,
    _id: postId
  }

  const update = { $set: updatedPost };

  const options = { new: true };

  Post.findOneAndUpdate(conditions, update, options)
    .then(post => {
      if (!post) {
        errors.nopost = 'No post found';
        return res.status(404).json(errors);
      }

      return res.status(200).json(post);
    })
    .catch(err => res.status(400).send());
};


const postResizedImgUpdate = (req, res) => {

  const userId = req.user._id;
  const { postId } = req.params;

  const updatedPost = {};

  if (req.body.imageIsResized) updatedPost.imageIsResized = true ;
  if (req.body.resizedImageName) updatedPost.resizedImageName = req.body.resizedImageName.trim();
  if (req.body.resizedImageUrl) updatedPost.resizedImageUrl = req.body.resizedImageUrl.trim();
  
  const conditions = {
    user: userId,
    _id: postId
  }

  const update = { $set: updatedPost };

  const options = { new: true };

  Post.findOneAndUpdate(conditions, update, options)
    .then(post => {
      if (!post) {
        errors.nopost = 'No post found';
        return res.status(404).json(errors);
      }

      return res.status(200).json(post);
    })
    .catch(err => res.status(400).send());
}

const postByIdGet = (req, res) => {
  const errors = {};
  const userId = req.user._id;
  const { postId } = req.params;

  Post.findOne({
    _id: postId,
    user: userId
  })
    .then(post => {
      if (!post) {
        errors.nopost = 'No post found';
        return res.status(404).json(errors);
      }
      return res.status(200).json(post);
    })
    .catch(err => res.status(400).send(err));
};

const postByUserIdGet = (req, res) => {
  const errors = {};
  const { userId } = req.params;

  // pagination
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 0;
  const nPerPage = 5;

  Post.find({ user: userId })
    // .select({ comments: 0 })
    .sort({ date: -1 })
    .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
    .limit(nPerPage)
    .then(posts => {
      if (!posts) {
        errors.post = 'No post found';
        return res.status(404).json(errors);
      }

      let postArr = [];
      posts.forEach(post => {
        const { _id, user, name, avatar, text, date, likes, comments, imageName, imageUrl, imageIsResized, resizedImageName, resizedImageUrl } = post;
        postArr.push({
          _id,
          user,
          name,
          avatar,
          text,
          likes,
          comments,
          date,
          imageName, 
          imageUrl,
          imageIsResized, 
          resizedImageName, 
          resizedImageUrl,
          numLikes: likes.length,
          numComments: comments.length
        });
      });

      return res.status(200).json(postArr);
    })
    .catch(err => res.status(400).send(err));
};

const postCountByUserIdGet = (req, res) => {
  const errors = {};
  const { userId } = req.params;

  Post.countDocuments({ user: userId })
    .then(numPosts => {
      if (!numPosts) {
        errors.postCount = 'no post'
        return res.status(404).json(errors);
      }
      res.json({ numPosts });
    })
    .catch(err => res.status(400).send());
};

module.exports = {
  postGet,
  postCountGet,
  postCreate,
  postByIdDelete,
  postByIdUpdate,
  postByIdGet,
  postByUserIdGet,
  postCountByUserIdGet,
  postResizedImgUpdate
};
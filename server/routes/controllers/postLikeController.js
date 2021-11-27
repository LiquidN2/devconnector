// Load DB models
const Post = require('./../../models/Post');

const postLikeToggle = (req, res) => {
  const errors = {};

  let postIsLiked;
  // get user id and post id
  const userId = req.user._id;
  const { postId } = req.params;

  // check if post exists
  Post.findById(postId)
    .then(post => {
      if (!post) {
        errors.nopost = 'no post found';
        res.status(404).json(errors);
        return Promise.reject();
      }

      // if post exists check if userId is in likes
      return Post.findOne({
        _id: postId,
        "likes.user": userId
      });
    })
    .then(isLiked => {
      const conditions = { _id: postId };
      const options = { new: true };
      const addLike = {
        $push: {
          likes: { user: userId }
        }
      };
      const removeLike = {
        $pull: {
          likes: { user: userId }
        }
      };

      let update;

      if (!isLiked) {
        postIsLiked = false; // set current like status of the post to true
        update = addLike; // update query to add userId to likes
      } else {
        postIsLiked = true; // set current like status of the post to false
        update = removeLike; // update query to remove userId from likes
      }

      return Post.findOneAndUpdate(conditions, update, options);
    })
    .then(updatedPost => {
      if (!updatedPost) {
        return Promise.reject();
      }

      postIsLiked = !postIsLiked; // update current like status of the post
      return res.status(200).json({ postIsLiked, updatedPost });
    })
    .catch(err => res.status(400).send());
};

module.exports = {
  postLikeToggle
};
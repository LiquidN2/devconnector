const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  name: {
    type: String
  },

  avatar: {
    type: String
  },

  text: {
    type: String,
    required: true
  },

  imageName: {
    type: String
  },

  imageUrl: {
    type: String
  },

  imageIsResized: {
    type: Boolean,
    default: false
  },

  resizedImageName: {
    type: String
  },

  resizedImageUrl: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  },

  likes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],

  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    text: {
      type: String,
      required: true
    },

    name: {
      type: String
    },

    avatar: {
      type: String
    },

    date: {
      type: Date,
      default: Date.now
    }
  }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
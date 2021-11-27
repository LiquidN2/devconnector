import React, { Component } from 'react';
import { connect } from 'react-redux';

import setAuthToken from './../utils/setAuthToken';

// load components
import Header from './header/Header';
import AvatarBox from './profile/AvatarBox';
import PostItem from './post/PostItem';
import Loading from './Loading';
import PostForm from './form/PostForm';

// load actions
import { setCurrentUserAsync } from './../actions/userActions';
import { getNumConnectionsAsync } from './../actions/connectionActions';
import {
  getCurrentUserPostCountAsync, 
  getCurrentUserPostsAsync, 
  createPostAsync,
  createPostWithFileAsync, 
  deletePostAsync, 
  postLikeToggleAsync,
  createCommentAsync 
} from './../actions/postActions';

import { fileSingleUploadAsync } from '../actions/fileActions';


class PostPage extends Component {
  state = {
    pageNumber: 1
  };

  componentDidMount = () => {
    setAuthToken(localStorage.getItem('token'));
    // get current user
    if (!this.props.user._id) {
      this.props.setCurrentUserAsync();
    }

    // get current user posts
    if (this.props.posts.length === 0) {
      this.props.getCurrentUserPostsAsync();
    }
    
    // get number of connections
    this.props.getNumConnectionsAsync();

    this.props.getCurrentUserPostCountAsync();
  };

  handleCreatePost = postText => {
    const newPost = {
      name: this.props.user.name,
      avatar: this.props.user.avatar,
      text: postText
    }
    this.props.createPostAsync(newPost);
    this.props.getCurrentUserPostCountAsync();
  };

  handleCreatePostWithFile = (fileBlob, fileName, postText) => {
    const postData = {
      userId: this.props.user._id,
      name: this.props.user.name,
      avatar: this.props.user.avatar,
      text: postText,
      imageName: fileName
    };

    // console.log(fileBlob, postData);
    this.props.createPostWithFileAsync(fileBlob, postData);
  };

  handleFileUpload = file => {
    console.log(typeof file);
    this.props.fileSingleUploadAsync(file);
  };

  handleDeletePost = postId => {
    // console.log(postId);
    this.props.deletePostAsync(postId);
    this.props.getCurrentUserPostCountAsync();
  };

  handleLikeToggle = postId => {
    // console.log(postId);
    this.props.postLikeToggleAsync(postId);
  }
  
  handleShowMorePosts = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1
    }), () => {
      this.props.getCurrentUserPostsAsync(this.state.pageNumber);
    });
  };

  handleCreateComment = (postId, commentText) => {
    const { name, avatar } = this.props.user;
    const commentData = {
      name,
      avatar,
      text: commentText
    };
    // console.log(postId, commentData);
    this.props.createCommentAsync(postId, commentData);
  };


  render() {
    
    return (
      <React.Fragment>
        <Header />
        <section className="section-profile">

          <div className="container row">
            <div className="col-1-of-4">
              <div className="row">
                <AvatarBox 
                  user={this.props.user} 
                  profile={this.props.profile}
                  numConnections={this.props.connections.numConnections}
                  numPosts={this.props.numPosts}
                />
              </div>
            </div>

            <div className="col-3-of-4">
              <div className="row">
                <div className="post-form-box">
                  <PostForm 
                    handleCreatePost={this.handleCreatePost} 
                    handleFileUpload={this.handleFileUpload}
                    handleCreatePostWithFile={this.handleCreatePostWithFile}
                    postErrors={this.props.postErrors}
                    isUpdatingPosts={this.props.isUpdatingPosts}
                    isUploadingfile={this.props.isUploadingfile}
                  />
                </div>
              </div>

              {
                this.props.isUploadingfile ? (
                  <div className="container u-margin-bottom-3rem">
                    <Loading />
                  </div>
                ) : null
              }
              
              {
                this.props.posts.map(post => {
                  return (
                    <div key={post._id} className="row">
                      <PostItem 
                        userId={this.props.user._id}
                        {...post}
                        handleLikeToggle={this.handleLikeToggle} 
                        handleDeletePost={this.handleDeletePost}
                        handleCreateComment={this.handleCreateComment}
                      />
                    </div>
                  )
                })
              }

              {
                this.props.isFetchingPosts ? (
                  <div className="container u-margin-bottom-3rem">
                    <Loading />
                  </div>
                ) : null
              }

              <div className="row u-display-flex-row-center">
                <button className="btn-link btn-link--color" onClick={this.handleShowMorePosts}>
                  <i className="fas fa-arrow-down"></i>&nbsp;
                  Show older posts
                </button>
              </div>

            </div>

          </div>
        </section>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => ({
  user: state.user.user,
  profile: state.profile.profile,
  connections: state.connections,
  isFetchingPosts: state.posts.isFetching,
  isUpdatingPosts: state.posts.isUpdating,
  postErrors: state.errors.post,
  posts: state.posts.posts,
  numPosts: state.posts.numPosts,
  isUploadingfile: state.files.isUploading
});

const mapDispatchToProps = {
  setCurrentUserAsync,
  getNumConnectionsAsync,
  getCurrentUserPostsAsync,
  getCurrentUserPostCountAsync,
  createPostAsync,
  deletePostAsync,
  postLikeToggleAsync,
  createCommentAsync,
  fileSingleUploadAsync,
  createPostWithFileAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
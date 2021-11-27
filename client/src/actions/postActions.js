import axios from 'axios';
import storage, { firebase } from '../firebase/firebase'; 
// import firebase from '../firebase/firebase';
// import * as storage from 'firebase/storage';
import uuidv1 from 'uuid/v1';

import { 
  CURRENT_USER_POSTS_REQUEST,
  CURRENT_USER_POSTS_ERRORS,
  CURRENT_USER_POSTS_SUCCESS,

  CURRENT_USER_POST_COUNT_REQUEST,
  CURRENT_USER_POST_COUNT_ERRORS,
  CURRENT_USER_POST_COUNT_SUCCESS,
  
  CURRENT_USER_POSTS_CREATE_REQUEST,
  CURRENT_USER_POSTS_CREATE_ERRORS,
  CURRENT_USER_POSTS_CREATE_SUCCESS,
  
  CURRENT_USER_POSTS_DELETE_REQUEST,
  CURRENT_USER_POSTS_DELETE_ERRORS,
  CURRENT_USER_POSTS_DELETE_SUCCESS,
  
  CURRENT_USER_POSTS_LIKE_TOGGLE_REQUEST,
  CURRENT_USER_POSTS_LIKE_TOGGLE_ERRORS,
  CURRENT_USER_POSTS_LIKE_TOGGLE_SUCCESS,
  
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_ERRORS,
  CREATE_COMMENT_SUCCESS,

  POSTS_BY_USER_ID_REQUEST,
  POSTS_BY_USER_ID_ERRORS,
  POSTS_BY_USER_ID_SUCCESS,

  POST_COUNT_BY_USER_ID_REQUEST,
  POST_COUNT_BY_USER_ID_ERRORS,
  POST_COUNT_BY_USER_ID_SUCCESS,

  CREATE_COMMENT_ON_VISIT_REQUEST,
  CREATE_COMMENT_ON_VISIT_ERRORS,
  CREATE_COMMENT_ON_VISIT_SUCCESS,

  POST_LIKE_TOGGLE_ON_VISIT_REQUEST,
  POST_LIKE_TOGGLE_ON_VISIT_ERRORS,
  POST_LIKE_TOGGLE_ON_VISIT_SUCCESS,

  // POST_RESIZED_IMG_URL_UPDATE_REQUEST,
  // POST_RESIZED_IMG_URL_UPDATE_ERRORS,
  // POST_RESIZED_IMG_URL_UPDATE_SUCCESS
} from './../constants/postActionTypes';

import {
  FILE_SINGLE_UPLOAD_REQUEST,
  FILE_SINGLE_UPLOAD_ERRORS,
  FILE_SINGLE_UPLOAD_SUCCESS,

  // FILE_GET_DOWNLOAD_URL_REQUEST,
  // FILE_GET_DOWNLOAD_URL_ERRORS,
  // FILE_GET_DOWNLOAD_URL_SUCCESS
} from '../constants/fileActionTypes';



const currentUserPostCountRequest = () => ({
  type: CURRENT_USER_POST_COUNT_REQUEST
});

const currentUserPostCountErrors = errors => ({
  type: CURRENT_USER_POST_COUNT_ERRORS,
  errors
});

const currentUserPostCountSuccess = ({ numPosts }) => ({
  type: CURRENT_USER_POST_COUNT_SUCCESS,
  numPosts
});

export const getCurrentUserPostCountAsync = () => {
  return dispatch => {
    dispatch(currentUserPostCountRequest());

    // setTimeout(() => {
    //   dispatch(currentUserPostCountSuccess(10));
    // }, 500);
    
    return axios.get(`/api/posts/count`)
      .then(res => {
        dispatch(currentUserPostCountSuccess(res.data));
      })
      .catch(err => {
        dispatch(currentUserPostCountErrors(err.response.data));
      });
  }
};


const currentUserPostsRequest = () => ({
  type: CURRENT_USER_POSTS_REQUEST
});

const currentUserPostsErrors = errors => ({
  type: CURRENT_USER_POSTS_ERRORS,
  errors
});

const currentUserPostsSuccess = (posts, page) => ({
  type: CURRENT_USER_POSTS_SUCCESS,
  page,
  posts
});

export const getCurrentUserPostsAsync = pageNumber => {
  return dispatch => {
    dispatch(currentUserPostsRequest());
    return axios.get(`/api/posts?pageNumber=${pageNumber}`)
      .then(res => {
        dispatch(currentUserPostsSuccess(res.data, pageNumber));
      })
      .catch(err => {
        dispatch(currentUserPostsErrors(err.response.data));
      });
  }
};


const currentUserPostsCreateRequest = () => ({
  type: CURRENT_USER_POSTS_CREATE_REQUEST
});

const currentUserPostsCreateErrors = errors => ({
  type: CURRENT_USER_POSTS_CREATE_ERRORS,
  errors
});

const currentUserPostsCreateSuccess = newPost => ({
  type: CURRENT_USER_POSTS_CREATE_SUCCESS,
  newPost
});

export const createPostAsync = newPostData => {
  return dispatch => {
    dispatch(currentUserPostsCreateRequest());
    return axios.post('/api/posts', newPostData)
      .then(res => {
        dispatch(currentUserPostsCreateSuccess(res.data));
      })
      .catch(err => {
        dispatch(currentUserPostsCreateErrors(err.response.data));
      });
  };
};

const currentUserPostDeleteRequest = () => ({
  type: CURRENT_USER_POSTS_DELETE_REQUEST
});

const currentUserPostDeleteErrors = errors => ({
  type: CURRENT_USER_POSTS_DELETE_ERRORS,
  errors
});

const currentUserPostDeleteSuccess = deletedPostId => ({
  type: CURRENT_USER_POSTS_DELETE_SUCCESS,
  deletedPostId
});

export const deletePostAsync = postId => {
  return dispatch => {
    dispatch(currentUserPostDeleteRequest());
    return axios.delete(`/api/posts/${postId}`)
      .then(res => {
        dispatch(currentUserPostDeleteSuccess(res.data._id));
      })
      .catch(err => {
        dispatch(currentUserPostDeleteErrors(err.response.data));
      });
  };
};

const currentUserPostLikeToggleRequest = () => ({
  type: CURRENT_USER_POSTS_LIKE_TOGGLE_REQUEST
});

const currentUserPostLikeToggleErrors = errors => ({
  type: CURRENT_USER_POSTS_LIKE_TOGGLE_ERRORS,
  errors
});

const currentUserPostLikeToggleSuccess = updatedPost => ({
  type: CURRENT_USER_POSTS_LIKE_TOGGLE_SUCCESS,
  updatedPost
});

export const postLikeToggleAsync = postId => {
  return dispatch => {
    dispatch(currentUserPostLikeToggleRequest());
    return axios.post(`/api/posts/like/${postId}`)
      .then(res => {
        dispatch(currentUserPostLikeToggleSuccess(res.data.updatedPost));
      })
      .catch(err => {
        dispatch(currentUserPostLikeToggleErrors(err.response.data));
      });
  };
};


const createCommentRequest = () => ({
  type: CREATE_COMMENT_REQUEST
});

const createCommentErrors = errors => ({
  type: CREATE_COMMENT_ERRORS,
  errors
});

const createCommentSuccess = (postId, newComment) => ({
  type: CREATE_COMMENT_SUCCESS,
  postId,
  newComment
});

export const createCommentAsync = (postId, commentData) => {
  return dispatch => {
    dispatch(createCommentRequest());
    return axios.post(`/api/posts/comment/${postId}`, commentData)
      .then(res => {
        dispatch(createCommentSuccess(postId, res.data));
      })
      .catch(err => {
        dispatch(createCommentErrors(err.response.data));
      });
  };
};


const postCountByUserIdRequest = () => ({
  type: POST_COUNT_BY_USER_ID_REQUEST
});

const postCountByUserIdErrors = errors => ({
  type: POST_COUNT_BY_USER_ID_ERRORS,
  errors
});

const postCountByUserIdSuccess = ({ numPosts }) => ({
  type: POST_COUNT_BY_USER_ID_SUCCESS,
  numPosts
});

export const getPostCountByUserIdAsync = userId => {
  return dispatch => {
    dispatch(postCountByUserIdRequest());
    // dispatch(postCountByUserIdSuccess({ numPosts: 10 }));

    return axios.get(`/api/posts/count/user/${userId}`)
      .then(res => {
        dispatch(postCountByUserIdSuccess(res.data));
      })
      .catch(err => {
        dispatch(postCountByUserIdErrors(err.response.data));
      })
  }
};


const postsByUserIdRequest = () => ({
  type: POSTS_BY_USER_ID_REQUEST
});

const postsByUserIdErrors = errors => ({
  type: POSTS_BY_USER_ID_ERRORS,
  errors
});

const postsByUserIdSuccess = (posts, page) => ({
  type: POSTS_BY_USER_ID_SUCCESS,
  page,
  posts
});

export const getPostsByUserIdAsync = (userId, pageNumber) => {
  return dispatch => {
    dispatch(postsByUserIdRequest());
    return axios.get(`/api/posts/user/${userId}?pageNumber=${pageNumber}`)
      .then(res => {
        dispatch(postsByUserIdSuccess(res.data, pageNumber));
      })
      .catch(err => {
        dispatch(postsByUserIdErrors(err.response.data));
      });
  }
};

const createCommentOnVisitRequest = () => ({
  type: CREATE_COMMENT_ON_VISIT_REQUEST
});

const createCommentOnVisitErrors = errors => ({
  type: CREATE_COMMENT_ON_VISIT_ERRORS,
  errors
});

const createCommentOnVisitSuccess = (postId, newComment) => ({
  type: CREATE_COMMENT_ON_VISIT_SUCCESS,
  postId,
  newComment
});

export const createCommentOnVisitAsync = (postId, commentData) => {
  return dispatch => {
    dispatch(createCommentOnVisitRequest());
    return axios.post(`/api/posts/comment/${postId}`, commentData)
      .then(res => {
        dispatch(createCommentOnVisitSuccess(postId, res.data));
      })
      .catch(err => {
        dispatch(createCommentOnVisitErrors(err.response.data));
      });
  };
};


const PostLikeToggleOnVisitRequest = () => ({
  type: POST_LIKE_TOGGLE_ON_VISIT_REQUEST
});

const PostLikeToggleOnVisitErrors = errors => ({
  type: POST_LIKE_TOGGLE_ON_VISIT_ERRORS,
  errors
});

const PostLikeToggleOnVisitSuccess = updatedPost => ({
  type: POST_LIKE_TOGGLE_ON_VISIT_SUCCESS,
  updatedPost
});

export const postLikeToggleOnVisitAsync = postId => {
  return dispatch => {
    dispatch(PostLikeToggleOnVisitRequest());
    return axios.post(`/api/posts/like/${postId}`)
      .then(res => {
        dispatch(PostLikeToggleOnVisitSuccess(res.data.updatedPost));
      })
      .catch(err => {
        dispatch(PostLikeToggleOnVisitErrors(err.response.data));
      });
  };
};


const fileSingleUploadRequest = () => ({
  type: FILE_SINGLE_UPLOAD_REQUEST
});

const fileSingleUploadErrors = errors => ({
  type: FILE_SINGLE_UPLOAD_ERRORS,
  errors
});

const fileSingleUploadSuccess = downloadURL => ({
  type: FILE_SINGLE_UPLOAD_SUCCESS,
  downloadURL
});

const metadata = {
  contentType: 'image/jpeg'
};

const storageRef = storage.ref();
const imagesRef = storageRef.child('images');

export const createPostWithFileAsync = (file, postData) => {
  return dispatch => {
    dispatch(fileSingleUploadRequest());

    const { userId } = postData;
    const newFileName = `${uuidv1()}.jpg`;
    const userIdRef = imagesRef.child(`${userId}`);
    // Upload file and metadata to the object 'images/'
    // const uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
    const uploadTask = userIdRef.child(newFileName).put(file, metadata);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      snapshot => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
          default:
            console.log('Upload in process');
        }
      }, error => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            dispatch(fileSingleUploadErrors({ fileUpload: "User doesn't have permission to access the object" }));
            break;

          case 'storage/canceled':
            // User canceled the upload
            dispatch(fileSingleUploadErrors({ fileUpload: "User canceled upload" }));
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            dispatch(fileSingleUploadErrors({ fileUpload: "Unknown error" }));
            break;

          default:
            dispatch(fileSingleUploadErrors({ fileUpload: "Unknown error" }));
            break;
        }
      }, () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL()
          .then(downloadURL => {
            // console.log('File available at', downloadURL);
            dispatch(fileSingleUploadSuccess(downloadURL));

            const postDataWithFileLink = {
              ...postData,
              imageName: newFileName,
              imageUrl: downloadURL
            };

            dispatch(createPostAsync(postDataWithFileLink));
            // console.log(postDataWithFileLink);
          });
      }
    );
  }
}


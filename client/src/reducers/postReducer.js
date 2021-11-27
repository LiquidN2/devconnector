import {
  USER_LOGOUT
} from './../constants/authActionTypes';

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

} from './../constants/postActionTypes';

const initialState = {
  isFetchingCount: false,
  isFetching: false,
  isUpdating: false,
  isUpdated: false,
  numPosts: 0,
  posts: []
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {

    case CURRENT_USER_POST_COUNT_REQUEST:
      return {
        ...state,
        isFetchingCount: true
      };

    case CURRENT_USER_POST_COUNT_ERRORS:
      return {
        ...state,
        isFetchingCount: false
      };

    case CURRENT_USER_POST_COUNT_SUCCESS:
      return {
        ...state,
        isFetchingCount: false,
        numPosts: action.numPosts
      };

    case CURRENT_USER_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case CURRENT_USER_POSTS_ERRORS:
      return {
        ...state,
        isFetching: false,
        posts: []
      }
    
    case CURRENT_USER_POSTS_SUCCESS:
      if (action.page > 1) {
        return {
          ...state,
          isFetching: false,
          posts: [
            ...state.posts,
            ...action.posts
          ]
        }
      } else {
        return {
          ...state,
          isFetching: false,
          posts: action.posts
        }
      }
    
    case CURRENT_USER_POSTS_DELETE_REQUEST:
    case CURRENT_USER_POSTS_CREATE_REQUEST:
    case CURRENT_USER_POSTS_LIKE_TOGGLE_REQUEST:
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        isUpdating: true,
        isUpdated: false
      }

    case CURRENT_USER_POSTS_DELETE_ERRORS:
    case CURRENT_USER_POSTS_CREATE_ERRORS:
    case CURRENT_USER_POSTS_LIKE_TOGGLE_ERRORS:
    case CREATE_COMMENT_ERRORS:
      return {
        ...state,
        isUpdating: false,
        isUpdated: false
      }

    case CURRENT_USER_POSTS_CREATE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        isUpdated: true,
        numPosts: state.numPosts + 1,
        posts: [
          action.newPost,
          ...state.posts
        ]
      }
    
    case CURRENT_USER_POSTS_DELETE_SUCCESS:
      const updatedPosts = state.posts.filter(post => {
        return post._id !== action.deletedPostId
      });

      return {
        ...state,
        isUpdating: false,
        isUpdated: true,
        numPosts: state.numPosts - 1,
        posts: updatedPosts
      }
    
    case CURRENT_USER_POSTS_LIKE_TOGGLE_SUCCESS:
      const updatedLikesInPosts = state.posts.map(post => {
        if (post._id === action.updatedPost._id) {
          return action.updatedPost;
        } else {
          return post;
        }
      });

      return {
        ...state,
        isUpdating: false,
        isUpdated: true,
        posts: updatedLikesInPosts
      }
    
    case CREATE_COMMENT_SUCCESS:
      const updatedCommentsInPosts = state.posts.map(post => {
        if (post._id === action.postId) {
          // return action.updatedPost;
          return {
            ...post,
            comments: [
              ...post.comments, 
              action.newComment
            ]
          }
        } else {
          return post;
        }
      });

      return {
        ...state,
        isUpdating: false,
        isUpdated: false,
        posts: updatedCommentsInPosts
      }

    case USER_LOGOUT:
      return {
        ...initialState
      };

    default:
      return state;
  }
}

export default postReducer;
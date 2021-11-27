import { USER_LOGOUT } from '../constants/authActionTypes';

import {
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
  POST_LIKE_TOGGLE_ON_VISIT_SUCCESS
} from '../constants/postActionTypes';

const initialState = {
  isFetchingCount: false,
  isFetching: false,
  isUpdating: false,
  isUpdated: false,
  numPosts: 0,
  posts: []
};

const visitingPostsReducer = (state = initialState, action) => {
  switch (action.type) {

    case POST_COUNT_BY_USER_ID_REQUEST:
      return {
        ...state,
        isFetchingCount: true
      };

    case POST_COUNT_BY_USER_ID_ERRORS:
      return {
        ...state,
        isFetchingCount: false
      };

    case POST_COUNT_BY_USER_ID_SUCCESS:
      return {
        ...state,
        isFetchingCount: false,
        numPosts: action.numPosts
      };

    case POSTS_BY_USER_ID_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case POSTS_BY_USER_ID_ERRORS:
      return {
        ...state,
        isFetching: false,
        posts: []
      }
    
    case POSTS_BY_USER_ID_SUCCESS:
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
    
    case CREATE_COMMENT_ON_VISIT_REQUEST:
    case POST_LIKE_TOGGLE_ON_VISIT_REQUEST:
      return {
        ...state,
        isUpdating: true,
        isUpdated: false
      }

    case CREATE_COMMENT_ON_VISIT_ERRORS:
    case POST_LIKE_TOGGLE_ON_VISIT_ERRORS:
      return {
        ...state,
        isUpdating: false,
        isUpdated: false
      };

    case CREATE_COMMENT_ON_VISIT_SUCCESS:
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

    case POST_LIKE_TOGGLE_ON_VISIT_SUCCESS:
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

    case USER_LOGOUT:
      return { ...initialState }

    default:
      return state;
  }
}

export default visitingPostsReducer;
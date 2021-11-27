// Load AUTHENTICATION & USER error actions
import {
  GET_REGISTER_ERRORS,
  CLEAR_ERRORS,
  CLEAR_LOGIN_ERRORS,
  CLEAR_REGISTER_ERRORS,
  SET_CURRENT_USER_ERRORS,
  USER_LOGIN_ERROR,
  USER_LOGOUT
} from './../constants/authActionTypes';

// Load PROFILE error actions
import {
  GET_CURRENT_USER_PROFILE_ERRORS,
  CURRENT_USER_PROFILE_UPDATE_ERRORS,
  CURRENT_USER_EXPERIENCES_ERRORS,
  CURRENT_USER_EDUCATION_ERRORS
} from './../constants/profileActionTypes';

// Load POST, COMMENT & LIKE error actions
import {
  CURRENT_USER_POSTS_ERRORS,
  CURRENT_USER_POSTS_CREATE_ERRORS,
  CURRENT_USER_POSTS_DELETE_ERRORS,
  CREATE_COMMENT_ERRORS,
} from './../constants/postActionTypes';

// Load CONNECTION error actions
import {
  PENDING_REQUEST_COUNT_ERRORS,
  PENDING_REQUEST_ERRORS,
  CONNECTION_COUNT_ERRORS,
  CONNECTIONS_ERRORS,
  APPROVE_CONNECTION_ERRORS
} from './../constants/connectionActionTypes';


// const initialState = {};
const initialState = {
  login: {},
  register: {},
  user: {},
  profile: {},
  post: {},
  comment: {},
  connections: {}
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {

    case USER_LOGIN_ERROR:
      return {
        ...state,
        login: action.errors
      };

    case GET_REGISTER_ERRORS:
      return {
        ...state,
        register: action.errors
      };

    case CLEAR_ERRORS:
      return { ...initialState };

    case CLEAR_LOGIN_ERRORS:
      return {
        ...state,
        login: {}
      };

    case CLEAR_REGISTER_ERRORS:
      return {
        ...state,
        register: {}
      };

    case SET_CURRENT_USER_ERRORS:
      return {
        ...state,
        user: action.errors
      }

    case GET_CURRENT_USER_PROFILE_ERRORS:
    case CURRENT_USER_PROFILE_UPDATE_ERRORS:
    case CURRENT_USER_EXPERIENCES_ERRORS:
    case CURRENT_USER_EDUCATION_ERRORS:
      return {
        ...state,
        profile: action.errors
      };

    case CURRENT_USER_POSTS_ERRORS:
    case CURRENT_USER_POSTS_CREATE_ERRORS:
    case CURRENT_USER_POSTS_DELETE_ERRORS:
      return {
        ...state,
        post: action.errors
      }

    case CREATE_COMMENT_ERRORS:
      return {
        ...state,
        comment: action.errors
      }

    case PENDING_REQUEST_COUNT_ERRORS:
    case PENDING_REQUEST_ERRORS:
    case CONNECTION_COUNT_ERRORS:
    case CONNECTIONS_ERRORS:
    case APPROVE_CONNECTION_ERRORS:
      return {
        ...state,
        connections: action.errors
      }

    case USER_LOGOUT:
      return {
        ...initialState
      };

    default:
      return state;
  }
};

export default errorReducer;
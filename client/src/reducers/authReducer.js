import jwt_decode from 'jwt-decode';
import tokenIsValid from '../utils/tokenIsValid';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  GET_LOGIN_ERRORS
} from './../constants/authActionTypes';

const token = localStorage.getItem('token');

const initialState = {
  isFetching: false,
  isAuthenticated: tokenIsValid(token) ? true : false,
  tokenPayload: tokenIsValid(token) ? jwt_decode(token) : {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        tokenPayload: {}
      };

    case USER_LOGIN_ERROR:
    case GET_LOGIN_ERRORS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        tokenPayload: {}
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        tokenPayload: action.decodedToken
      };

    case USER_LOGOUT:
      return {
        isFetching: false,
        isAuthenticated: false,
        tokenPayload: {}
      };

    default:
      return state;
  }
};

export default authReducer;
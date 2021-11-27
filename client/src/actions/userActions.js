import axios from 'axios';
import {
  SET_CURRENT_USER_REQUEST,
  SET_CURRENT_USER_SUCCESS,
  SET_CURRENT_USER_ERRORS
} from './../constants/authActionTypes';

const setCurrentUserRequest = () => ({
  type: SET_CURRENT_USER_REQUEST
});

const setCurrentUserErrors = errors => ({
  type: SET_CURRENT_USER_ERRORS,
  errors
});

const setCurrentUserSuccess = user => ({
  type: SET_CURRENT_USER_SUCCESS,
  user
});

export const setCurrentUserAsync = () => {
  return dispatch => {

    dispatch(setCurrentUserRequest());

    return axios.get('/api/users/current')
      .then(res => {
        dispatch(setCurrentUserSuccess(res.data));
      })
      .catch(err => {
        dispatch(setCurrentUserErrors(err.response.data));
      });
  }
}
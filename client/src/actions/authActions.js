import axios from 'axios';
import jwt_decode from 'jwt-decode';

import history from './../routers/history';
import setAuthToken from './../utils/setAuthToken';
import { firebase } from '../firebase/firebase';
// import 'firebase/auth';
// import firebase from 'firebase/app';

import {
  CLEAR_LOGIN_ERRORS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT
} from './../constants/authActionTypes';

// ----- action auth state -----
const userLoginRequest = () => ({
  type: USER_LOGIN_REQUEST
});

const userLoginError = errors => ({
  type: USER_LOGIN_ERROR,
  errors
});

const userLoginSuccess = decodedToken => ({
  type: USER_LOGIN_SUCCESS,
  decodedToken
});

const userLoggedOutState = () => ({
  type: USER_LOGOUT
});

const clearLoginErrors = () => ({
  type: CLEAR_LOGIN_ERRORS
});

// LOGIN Async
const userLogin = user => {
  return dispatch => {

    dispatch(clearLoginErrors());
    dispatch(userLoginRequest());

    return axios.post('api/users/login', user)
      .then(res => {
        // get token from response
        const { token, firebaseToken } = res.data;
        // save to local storage
        localStorage.setItem('token', token);
        localStorage.setItem('firebaseToken', firebaseToken);
        // set token to auth header
        setAuthToken(token);
        // decode token to get user data
        const decodedToken = jwt_decode(token);
        // set current user
        dispatch(userLoginSuccess(decodedToken));
        // redirect to profile is done by PublicRoute

        // sign in to firebase for image upload
        firebase.auth().signInWithCustomToken(firebaseToken)
          .catch(error => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ...
          });
      })
      .catch(err => {
        // dispatch(getAuthErrors(err.response.data));
        dispatch(userLoginError(err.response.data));
      });
  }
}


const userLogout = () => {
  return dispatch => {
    // remove token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('firebaseToken');
    // remove token from headers
    setAuthToken(null);

    // sign out firebase
    firebase.auth().signOut()
      .then(() => {
        // Sign-out successful.
        console.log('signed out of firebase');
      })
      .catch(error => {
        // An error happened.
        console.log('unable to sign out of firebase');
      });

    // reset application auth state
    dispatch(userLoggedOutState());

    history.push('/login');
  }
}

export { userLogin, userLogout, clearLoginErrors };
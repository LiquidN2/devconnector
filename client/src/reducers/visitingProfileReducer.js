import { USER_LOGOUT } from '../constants/authActionTypes';

import {
  GET_PROFILE_BY_USER_ID_REQUEST,
  GET_PROFILE_BY_USER_ID_ERRORS,
  GET_PROFILE_BY_USER_ID_SUCCESS
} from '../constants/profileActionTypes';


const initialState = {
  isFetching: false,
  profile: {}
};

const visitingProfileReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PROFILE_BY_USER_ID_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case GET_PROFILE_BY_USER_ID_ERRORS:
      return {
        ...state,
        isFetching: false
      }

    case GET_PROFILE_BY_USER_ID_SUCCESS:
      return {
        ...state,
        isFetching: false,
        profile: action.profile
      }


    case USER_LOGOUT:
      return { ...initialState }

    default:
      return state;
  }
};

export default visitingProfileReducer;
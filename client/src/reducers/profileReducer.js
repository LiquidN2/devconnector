import { USER_LOGOUT } from '../constants/authActionTypes';

import { 
  GET_CURRENT_USER_PROFILE,
  GET_CURRENT_USER_PROFILE_ERRORS,
  SET_CURRENT_USER_PROFILE,
  CURRENT_USER_PROFILE_UPDATE_REQUEST,
  CURRENT_USER_PROFILE_UPDATE_ERRORS,
  CURRENT_USER_PROFILE_UPDATE_SUCCESS,
  CURRENT_USER_EXPERIENCES_REQUEST,
  CURRENT_USER_EXPERIENCES_ERRORS,
  CURRENT_USER_EXPERIENCES_SUCCESS,
  CURRENT_USER_EDUCATION_REQUEST,
  CURRENT_USER_EDUCATION_ERRORS,
  CURRENT_USER_EDUCATION_SUCCESS
} from '../constants/profileActionTypes';

const initialState = {
  isFetching: false,
  isUpdating: false,
  isUpdated: false,
  profile: {}
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_PROFILE:
      return {
        ...state,
        isFetching: true
      };


    case GET_CURRENT_USER_PROFILE_ERRORS:
      return {
        ...state,
        isFetching: false,
        profile: {}
      };

    case SET_CURRENT_USER_PROFILE:
      return {
        ...state,
        isFetching: false,
        profile: {
          ...state.profile,
          ...action.profile
        }
      };

    case CURRENT_USER_PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        isUpdating: true,
        isUpdated: false
      };

    case CURRENT_USER_PROFILE_UPDATE_ERRORS:
      return {
        ...state,
        isUpdating: false,
        isUpdated: false
      };

    case CURRENT_USER_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        isUpdated: true
      };

    case CURRENT_USER_EXPERIENCES_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case CURRENT_USER_EXPERIENCES_ERRORS:
      return {
        ...state,
        isFetching: false
      }

    case CURRENT_USER_EXPERIENCES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        profile: {
          ...state.profile,
          experience: action.experiences
        }
      }

    case CURRENT_USER_EDUCATION_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case CURRENT_USER_EDUCATION_ERRORS:
      return {
        ...state,
        isFetching: false
      }

    case CURRENT_USER_EDUCATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        profile: {
          ...state.profile,
          education: action.education
        }
      }

    case USER_LOGOUT:
      return {
        ...initialState
      };

    default:
      return state;
  }
}

export default profileReducer;
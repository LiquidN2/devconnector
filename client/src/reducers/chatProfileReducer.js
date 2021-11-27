import { USER_LOGOUT } from '../constants/authActionTypes';

import { 
  CHAT_PROFILE_REQUEST,
  CHAT_PROFILE_ERRORS,
  CHAT_PROFILE_SUCCESS,
} from '../constants/profileActionTypes';

const initiatlState = {
  isFetching: false,
  isFetchingUserId: ''
};

const chatProfileReducer = (state = initiatlState, action) => {
  switch(action.type) {
    case CHAT_PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetchingUserId: action.userId
      }
    
    case CHAT_PROFILE_ERRORS:
      return {
        ...state,
        isFetching: false,
        isFetchingUserId: ''
      }

    case CHAT_PROFILE_SUCCESS:
      const newState = { 
        ...state, 
        isFetching: false 
      };
      
      newState[action.userId] = action.profile;
      
      return newState;

    case USER_LOGOUT:
      return { ...initiatlState }

    default:
      return state
  }
};

export default chatProfileReducer;
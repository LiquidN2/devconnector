import { USER_LOGOUT } from '../constants/authActionTypes';

import { 
  ROOMS_REQUEST,
  ROOMS_ERRORS,
  ROOMS_SUCCESS
} from '../constants/messageActionTypes';

const initialState = {
  isFetchingAll: false,
  current: '',
  all: []
}

const roomReducer = (state = initialState, action) => {
  switch(action.type) {
    case ROOMS_REQUEST:
      return {
        ...state,
        isFetchingAll: true
      }

    case ROOMS_ERRORS: 
      return {
        ...state,
        isFetchingAll: false
      }

    case ROOMS_SUCCESS:
      return {
        ...state,
        isFetchingAll: false,
        all: action.rooms
      }

    case USER_LOGOUT:
      return { ...initialState }
    
    default:
      return state;
  }
};

export default roomReducer
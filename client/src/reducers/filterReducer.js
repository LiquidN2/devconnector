import { USER_LOGOUT } from '../constants/authActionTypes';

import { 
  SET_LOCATION_FILTER,
  SET_COMPANY_FILTER
} from '../constants/searchActionTypes';

const initialState = {
  company: '',
  location: ''
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION_FILTER:
      return {
        ...state,
        location: action.location
      }
    
    case SET_COMPANY_FILTER:
      return {
        ...state,
        company: action.company
      }

    case USER_LOGOUT: 
      return { ...initialState }

    default:
      return state
  }
};

export default filterReducer;
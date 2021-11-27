import { USER_LOGOUT } from '../constants/authActionTypes';

import {
  QUERY_REQUEST,
  QUERY_SUCCESS,
  QUERY_ERRORS
} from '../constants/searchActionTypes';

const initialState = {
  query: '',
  isFetchingResults: false,
  generalResults: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {

    case QUERY_REQUEST:
      return {
        ...state,
        query: action.query,
        isFetchingResults: true
      };

    case QUERY_ERRORS:
      return {
        ...state,
        isFetchingResults: false
      };
      
    case QUERY_SUCCESS:
      let generalResults;
      if (action.pageNumber < 2) {
        generalResults = action.results;
      } else {
        generalResults = [...state.generalResults, ...action.results];
      }

      return {
        ...state,
        isFetchingResults: false,
        generalResults
      }

    case USER_LOGOUT:
      return { ...initialState }

    default:
      return state
  }
};

export default searchReducer;

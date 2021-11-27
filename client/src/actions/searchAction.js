import axios from 'axios';

import {
  QUERY_REQUEST,
  QUERY_SUCCESS,
  QUERY_ERRORS
} from '../constants/searchActionTypes';

// export const setQuery = query => ({
//   type: SET_QUERY,
//   query
// });

const queryRequest = query => ({
  type: QUERY_REQUEST,
  query
});

const queryErrors = () => ({
  type: QUERY_ERRORS
});

const querySuccess = (results, pageNumber = 0) => ({
  type: QUERY_SUCCESS,
  pageNumber,
  results
});

export const searchAsync = (query, pageNumber) => dispatch => {
  dispatch(queryRequest(query));
  
  return axios.get(`/api/search?q=${query}&pageNumber=${pageNumber}`)
    .then(res => {
      if(!res) {
        dispatch(querySuccess([]));
      } else {
        console.log(res.data);
        dispatch(querySuccess(res.data, pageNumber));
      }
    })
    .catch(err => {
      dispatch(queryErrors(err.response.data));
    });
};
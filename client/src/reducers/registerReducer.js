import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR
} from './../constants/actionTypes';

const initialState = {
  isFetching: false,
  isRegistered: false
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        isFetching: true,
        isRegistered: false
      };

    case USER_REGISTER_ERROR:
      return {
        isFetching: false,
        isRegistered: false
      };

    case USER_REGISTER_SUCCESS:
      return {
        isFetching: false,
        isRegistered: true
      };

    default:
      return state;
  }
};

export default registerReducer;
import { USER_LOGOUT } from '../constants/authActionTypes';

import {
  CONNECTION_STATUS_REQUEST,
  CONNECTION_STATUS_ERRORS,
  CONNECTION_STATUS_SUCCESS,

  CONNECTION_COUNT_BY_USER_ID_REQUEST,
  CONNECTION_COUNT_BY_USER_ID_ERRORS,
  CONNECTION_COUNT_BY_USER_ID_SUCCESS
} from '../constants/connectionActionTypes';

const initialState = {
  isFetchingConnectionStatus: false,
  visitingUserId: '',
  connected: false,
  pendingRequestFrom: false,
  pendingRequestTo: false,

  isFetchingConnectionCount: false,
  numConnections: 0
};

const visitingConnectionReducer = (state = initialState, action) => {
  switch(action.type) {

    case CONNECTION_STATUS_REQUEST:
      return {
        ...state,
        isFetchingConnectionStatus: true
      };

    case CONNECTION_STATUS_ERRORS:
      return {
        ...state,
        isFetchingConnectionStatus: false
      };

    case CONNECTION_STATUS_SUCCESS:
      return {
        ...state,
        isFetchingConnectionStatus: false,
        visitingUserId: action.visitingUserId,
        connected: action.connected,
        pendingRequestFrom: action.pendingRequestFrom,
        pendingRequestTo: action.pendingRequestTo
      }

    case CONNECTION_COUNT_BY_USER_ID_REQUEST:
      return {
        ...state,
        isFetchingConnectionCount: true
      };

    case CONNECTION_COUNT_BY_USER_ID_ERRORS:
      return {
        ...state,
        isFetchingConnectionCount: false
      };

    case CONNECTION_COUNT_BY_USER_ID_SUCCESS:
      return {
        ...state,
        isFetchingConnectionCount: false,
        numConnections: action.numConnections
      };

    case USER_LOGOUT:
      return { ...initialState }

    default:
      return state;
  }
}

export default visitingConnectionReducer;
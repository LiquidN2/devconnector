import {
  USER_LOGOUT
} from './../constants/authActionTypes';

import {
  CONNECTION_COUNT_REQUEST,
  CONNECTION_COUNT_ERRORS,
  CONNECTION_COUNT_SUCCESS,

  CONNECTIONS_REQUEST,
  CONNECTIONS_ERRORS,
  CONNECTIONS_SUCCESS,

  PENDING_REQUEST_COUNT_REQUEST,
  PENDING_REQUEST_COUNT_ERRORS,
  PENDING_REQUEST_COUNT_SUCCESS,

  PENDING_REQUEST_REQUEST,
  PENDING_REQUEST_ERRORS,
  PENDING_REQUEST_SUCCESS,

  APPROVE_CONNECTION_REQUEST,
  APPROVE_CONNECTION_ERRORS,
  APPROVE_CONNECTION_SUCCESS,

  DECLINE_CONNECTION_REQUEST,
  DECLINE_CONNECTION_ERRORS,
  DECLINE_CONNECTION_SUCCESS,

  REMOVE_CONNECTION_REQUEST,
  REMOVE_CONNECTION_ERRORS,
  REMOVE_CONNECTION_SUCCESS,

  ADD_CONNECTION_REQUEST,
  ADD_CONNECTION_ERRORS,
  ADD_CONNECTION_SUCCESS

} from './../constants/connectionActionTypes';

const initialState = {
  // isFetching: false,
  isFetchingPendingRequest: false,
  isFetchingConnections: false,
  isApprovingRequest: false,
  requestApproved: false,
  isDecliningRquest: false,
  isRemovingConnection: false,
  
  isFetchingConnectionStatus: false,
  isAddingConnection: false,
  connectionSent: false,
  
  numConnections: 0,
  numPendingRequests: 0,
  connections: [],
  pendingRequests: []
};

const connectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case PENDING_REQUEST_COUNT_REQUEST:
    case PENDING_REQUEST_REQUEST:
      return {
        ...state,
        isFetchingPendingRequest: true
      };

    case PENDING_REQUEST_COUNT_ERRORS:
    case PENDING_REQUEST_ERRORS:
      return {
        ...state,
        isFetchingPendingRequest: false,
        numPendingRequests: 0,
        pendingRequests: []
      };

    case PENDING_REQUEST_COUNT_SUCCESS:
      return {
        ...state,
        isFetchingPendingRequest: false,
        numPendingRequests: action.numPendingRequests
      };

    case PENDING_REQUEST_SUCCESS:
      return {
        ...state,
        isFetchingPendingRequest: false,
        numPendingRequests: action.numPendingRequests,
        pendingRequests: action.pendingRequests
      };

    case CONNECTION_COUNT_REQUEST:
    case CONNECTIONS_REQUEST:
      return {
        ...state,
        isFetchingConnections: true
      };

    case CONNECTION_COUNT_ERRORS:
    case CONNECTIONS_ERRORS:
      return {
        ...state,
        isFetchingConnections: false,
        numConnections: 0,
        connections: []
      };

    case CONNECTION_COUNT_SUCCESS:
      return {
        ...state,
        isFetchingConnections: false,
        numConnections: action.numConnections
      };

    case CONNECTIONS_SUCCESS:
      if (action.page > 1) {
        return {
          ...state,
          isFetchingConnections: false,
          connections: [...state.connections, ...action.connections]
        }
      } else {
        return {
          ...state,
          isFetchingConnections: false,
          connections: action.connections
        };
      }
    
    case APPROVE_CONNECTION_REQUEST:
      return {
        ...state,
        isApprovingRequest: true,
        requestApproved: false
      };
    
    case APPROVE_CONNECTION_ERRORS:
      return {
        ...state,
        isApprovingRequest: false,
        requestApproved: false
      }

    case APPROVE_CONNECTION_SUCCESS:
      const updatedPendingRequests = state.pendingRequests.filter(pendingRequest => {
        return pendingRequest._id !== action.pendingRequestId
      });

      const newConnection = {
        _id: action.pendingRequestId,
        user: action.user,
        profile: action.profile
      };

      return {
        ...state,
        isApprovingRequest: false,
        requestApproved: true,
        numPendingRequests: state.numPendingRequests - 1,
        pendingRequests: updatedPendingRequests,
        numConnections: state.numConnections + 1,
        connections: [newConnection, ...state.connections]
      }

    case REMOVE_CONNECTION_REQUEST:
      return {
        ...state,
        isRemovingConnection: true
      }

    case REMOVE_CONNECTION_ERRORS:
      return {
        ...state,
        isRemovingConnection: false
      }

    case REMOVE_CONNECTION_SUCCESS:
      const updatedConnections = state.connections.filter(connection => {
        return connection._id !== action.removedConnectionId;
      });

      return {
        ...state,
        isRemovingConnection: false,
        numConnections: state.numConnections - 1,
        connections: updatedConnections
      }

    case DECLINE_CONNECTION_REQUEST:
      return {
        ...state,
        isDecliningRquest: true
      }

    case DECLINE_CONNECTION_ERRORS:
      return {
        ...state,
        isDecliningRquest: false
      }

    case DECLINE_CONNECTION_SUCCESS:
      const postDeclinePendingRequests = state.pendingRequests.filter(pendingRequest => {
        return pendingRequest._id !== action.pendingRequestId;
      });

      return {
        ...state,
        isDecliningRquest: false,
        numPendingRequests: state.numPendingRequests - 1,
        pendingRequests: postDeclinePendingRequests
      };

    case ADD_CONNECTION_REQUEST:
      return {
        ...state,
        isAddingConnection: true,
        connectionSent: false
      };

    case ADD_CONNECTION_ERRORS:
      return {
        ...state,
        isAddingConnection: false,
        connectionSent: false
      };
    
    case ADD_CONNECTION_SUCCESS:
      return {
        ...state,
        isAddingConnection: false,
        connectionSent: true
      };
    
    case USER_LOGOUT:
      return {
        ...initialState
      };

    default:
      return state;
  }
}

export default connectionReducer;
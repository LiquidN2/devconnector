import axios from 'axios';

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
  ADD_CONNECTION_SUCCESS,

  CONNECTION_STATUS_REQUEST,
  CONNECTION_STATUS_ERRORS,
  CONNECTION_STATUS_SUCCESS,

  CONNECTION_COUNT_BY_USER_ID_REQUEST,
  CONNECTION_COUNT_BY_USER_ID_ERRORS,
  CONNECTION_COUNT_BY_USER_ID_SUCCESS
} from './../constants/connectionActionTypes';


const connectionCountRequest = () => ({
  type: CONNECTION_COUNT_REQUEST
});

const connectionCountErrors = errors => ({
  type: CONNECTION_COUNT_ERRORS,
  errors
});

const connectionCountSuccess = ({ numConnections }) => ({
  type: CONNECTION_COUNT_SUCCESS,
  numConnections
});

export const getNumConnectionsAsync = () => {
  return dispatch => {
    dispatch(connectionCountRequest());
    return axios.get('/api/connections/count')
      .then(res => {
        dispatch(connectionCountSuccess(res.data));
      })
      .catch(err => {
        dispatch(connectionCountErrors(err.response.data));
      });
  };
};


const connectionsRequest = () => ({
  type: CONNECTIONS_REQUEST
});

const connectionsErrors = errors => ({
  type: CONNECTIONS_ERRORS,
  errors
});

const connectionsSuccess = (page, connections) => ({
  type: CONNECTIONS_SUCCESS,
  page,
  connections
});

export const getConnectionsAsync = pageNumber => {
  return dispatch => {
    dispatch(connectionsRequest());
    return axios.get(`/api/connections?pageNumber=${pageNumber}`)
      .then(res => {
        dispatch(connectionsSuccess(pageNumber, res.data));
      })
      .catch(err => {
        dispatch(connectionsErrors(err.response.data));
      });
  }
};


const pendingRequestCountRequest = () => ({
  type: PENDING_REQUEST_COUNT_REQUEST
});

const pendingRequestCountErrors = errors => ({
  type: PENDING_REQUEST_COUNT_ERRORS,
  errors
});

const pendingRequestCountSuccess = ({ numPendingRequests }) => ({
  type: PENDING_REQUEST_COUNT_SUCCESS,
  numPendingRequests
});

export const getNumPendingRequestsAsync = () => {
  return dispatch => {
    dispatch(pendingRequestCountRequest());
    return axios.get('/api/connections/countpending')
      .then(res => {
        dispatch(pendingRequestCountSuccess(res.data));
      })
      .catch(err => {
        dispatch(pendingRequestCountErrors(err.response.data));
      });
  }
};

const pendingRequestRequest = () => ({
  type: PENDING_REQUEST_REQUEST
});

const pendingRequestErrors = errors => ({
  type: PENDING_REQUEST_ERRORS,
  errors
});

const pendingRequestSuccess = ({ numPendingRequests, pendingRequests }) => ({
  type: PENDING_REQUEST_SUCCESS,
  numPendingRequests,
  pendingRequests
});

export const getPendingRequestsAsync = () => {
  return dispatch => {
    dispatch(pendingRequestRequest());
    return axios.get('/api/connections/pending')
      .then(res => {
        dispatch(pendingRequestSuccess(res.data));
      })
      .catch(err => {
        dispatch(pendingRequestErrors(err.response.data));
      });
  }
};


const approveConnectionRequest = () => ({
  type: APPROVE_CONNECTION_REQUEST
});

const approveConnectionErrors = errors => ({
  type: APPROVE_CONNECTION_ERRORS,
  errors
});

const approveConnectionSuccess = (user, profile, pendingRequestId) => ({
  type: APPROVE_CONNECTION_SUCCESS,
  user,
  profile,
  pendingRequestId
});

export const approveConnectionAsync = ({ user, profile, selfProfileId, pendingRequestId }) => {
  const userId = user._id;
  const profileId = profile._id;

  return dispatch => {
    dispatch(approveConnectionRequest());

    // setTimeout(() => {
    //   dispatch(approveConnectionSuccess(user, profile, pendingRequestId));
    // }, 1000);  

    return axios.patch('/api/connections/approve', {userId, profileId, selfProfileId})
      .then(res => {
        if (res.data.connectionApproved) {
          dispatch(approveConnectionSuccess(user, profile, pendingRequestId));
        } else {
          dispatch(approveConnectionErrors(res.data.errors));
        }
      })
      .catch(err => {
        dispatch(approveConnectionErrors(err.response.data));
      });
  }
};

const declineConnectionRequest = () => ({
  type: DECLINE_CONNECTION_REQUEST
});

const declineConnectionErrors = errors => ({
  type: DECLINE_CONNECTION_ERRORS,
  errors
});

const declineConnectionSuccess = pendingRequestId => ({
  type: DECLINE_CONNECTION_SUCCESS,
  pendingRequestId
});

export const declineConnectionAsync = ({userId, pendingRequestId}) => {
  return dispatch => {
    dispatch(declineConnectionRequest());
    // setTimeout(() => {
    //   dispatch(declineConnectionSuccess(pendingRequestId));
    // }, 500);
    
    return axios.patch('/api/connections/decline', { userId })
      .then(res => {
        if (res.data.connectionDeclined) {
          dispatch(declineConnectionSuccess(pendingRequestId));
        } else {
          dispatch(declineConnectionErrors(res.data.errors));
        }
      })
      .catch(err => {
        dispatch(declineConnectionErrors(err.response.data));
      });
  }
};

const removeConnectionRequest = () => ({
  type: REMOVE_CONNECTION_REQUEST
});

const removeConnectionErrors = errors => ({
  type: REMOVE_CONNECTION_ERRORS,
  errors
});

const removeConnectionSuccess = removedConnectionId => ({
  type: REMOVE_CONNECTION_SUCCESS,
  removedConnectionId
});

export const removeConnectionAsync = (userId, connectionId) => {
  return dispatch => {
    dispatch(removeConnectionRequest());

    // setTimeout(() => {
    //   dispatch(removeConnectionSuccess(connectionId));
    // }, 1000);
    
    return axios({
      method: 'delete',
      url: '/api/connections', 
      data: { userId }
    })
      .then(res => {
        if (res.data.connectionRemoved) {
          dispatch(removeConnectionSuccess(connectionId));
        } else {
          dispatch(removeConnectionErrors(res.data.errors));
        }
      })
      .catch(err => {
        dispatch(removeConnectionErrors(err.response.data));
      });
  }
};


const addConnectionRequest = () => ({
  type: ADD_CONNECTION_REQUEST
});

const addConnectionErrors = errors => ({
  type: ADD_CONNECTION_ERRORS,
  errors
});

const addConnectionSuccess = () => ({
  type: ADD_CONNECTION_SUCCESS
});

export const addConnectionAsync = ({ userId, profileId, selfProfileId }) => {
  return dispatch => {
    dispatch(addConnectionRequest());

    // setTimeout(() => {
    //   dispatch(addConnectionSuccess());
    // }, 1000);
    
    return axios.post('/api/connections', { userId, profileId, selfProfileId })
      .then(res => {
        if (res.data.connectionSent) {
          dispatch(addConnectionSuccess());
        } else {
          dispatch(addConnectionErrors(res.data.errors));
        }
      })
      .catch(err => {
        dispatch(addConnectionErrors(err.response.data));
      });
  }
};


const connectionStatusRequest = () => ({
  type: CONNECTION_STATUS_REQUEST
});

const connectionStatusrrors = errors => ({
  type: CONNECTION_STATUS_ERRORS,
  errors
});

const connectionStatusSuccess = ({ visitingUserId, connected, pendingRequestFrom, pendingRequestTo }) => ({
  type: CONNECTION_STATUS_SUCCESS,
  visitingUserId,
  connected,
  pendingRequestFrom,
  pendingRequestTo
});

export const getConnectionStatusAsync = userId => {
  return dispatch => {
    dispatch(connectionStatusRequest());
    
    return axios.get(`/api/connections/status/user/${userId}`)
      .then(res => {
        dispatch(connectionStatusSuccess(res.data));
      })
      .catch(err => {
        dispatch(connectionStatusrrors(err.response.data));
      });
  }
};


const connectionCountByUserIdRequest = () => ({
  type: CONNECTION_COUNT_BY_USER_ID_REQUEST
});

const connectionCountByUserIdErrors = errors => ({
  type: CONNECTION_COUNT_BY_USER_ID_ERRORS,
  errors
});

const connectionCountByUserIdSuccess = ({ numConnections }) => ({
  type: CONNECTION_COUNT_BY_USER_ID_SUCCESS,
  numConnections
});

export const getConnectionCountByUserIdAsync = userId => {
  return dispatch => {
    dispatch(connectionCountByUserIdRequest());
    // dispatch(connectionCountByUserIdSuccess({ numConnections: 15 }));
    return axios.get(`/api/connections/count/user/${userId}`)
      .then(res => {
        dispatch(connectionCountByUserIdSuccess(res.data));
      })
      .catch(err => {
        dispatch(connectionCountByUserIdErrors(err.response.data));
      });
  };
};

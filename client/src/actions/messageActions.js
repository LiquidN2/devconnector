import axios from 'axios';

import {
  ROOMS_REQUEST,
  ROOMS_ERRORS,
  ROOMS_SUCCESS,

  MESSAGES_BY_ROOM_ID_REQUEST,
  MESSAGES_BY_ROOM_ID_ERRORS,
  MESSAGES_BY_ROOM_ID_SUCCESS,

  ADD_NEW_MESSAGE,
  ADD_OWN_UNSAVED_MESSAGE,

  SAVING_MESSAGES_REQUEST,
  SAVING_MESSAGES_ERRORS,
  SAVING_MESSAGES_SUCCESS
} from '../constants/messageActionTypes';

const roomsRequest = () => ({
  type: ROOMS_REQUEST
});

const roomsErrors = errors => ({
  type: ROOMS_ERRORS,
  errors
});

const roomsSuccess = rooms => ({
  type: ROOMS_SUCCESS,
  rooms
});

export const getRoomsAsync = (roomType, targetUserId) => dispatch => {
  dispatch(roomsRequest());

  let url = `/api/rooms?roomType=${roomType}`;
  if (targetUserId) {
    url = url + `&targetUserId=${targetUserId}`;
  }

  return axios.get(url)
    .then(res => {
      dispatch(roomsSuccess(res.data));
    })
    .catch(err => {
      dispatch(roomsErrors(err.response.data));
    });
};

const messagesByRoomIdRequest = roomId => ({
  type: MESSAGES_BY_ROOM_ID_REQUEST,
  roomId
});

const messagesByRoomIdErrors = errors => ({
  type: MESSAGES_BY_ROOM_ID_ERRORS,
  errors
});

const messagesByRoomIdSuccess = messages => ({
  type: MESSAGES_BY_ROOM_ID_SUCCESS,
  messages
});

export const getMessagesByRoomIdAsync = roomId => dispatch => {
  dispatch(messagesByRoomIdRequest(roomId));

  return axios.get(`/api/messages/room/${roomId}`)
    .then(res => {
      dispatch(messagesByRoomIdSuccess(res.data));
    })
    .catch(err => {
      dispatch(messagesByRoomIdErrors(err.response.data));
    })
};


export const addNewMessage = message => ({
  type: ADD_NEW_MESSAGE,
  message
});

export const addOwnUnsavedMessage = message => ({
  type: ADD_OWN_UNSAVED_MESSAGE,
  message
});


const savingMessagesRequest = () => ({
  type: SAVING_MESSAGES_REQUEST
});

const savingMessagesErrors = errors => ({
  type: SAVING_MESSAGES_ERRORS,
  errors
});

const savingMessagesSuccess = () => ({
  type: SAVING_MESSAGES_SUCCESS 
});

export const saveMessagesAsync = unsaved => dispatch => {
  dispatch(savingMessagesRequest());

  // setTimeout(() => {
  //   console.log('saving...', unsaved);
  //   dispatch(savingMessagesSuccess());
  // }, 500);

  return axios.post('/api/messages/many', { unsaved })
    .then(res => {
      dispatch(savingMessagesSuccess());
    })
    .catch(err => dispatch(savingMessagesErrors(err.response.data)));
};
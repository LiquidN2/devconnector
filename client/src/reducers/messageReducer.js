import moment from 'moment';
import { USER_LOGOUT } from '../constants/authActionTypes';

import {
  MESSAGES_BY_ROOM_ID_REQUEST,
  MESSAGES_BY_ROOM_ID_ERRORS,
  MESSAGES_BY_ROOM_ID_SUCCESS,

  ADD_NEW_MESSAGE,

  ADD_OWN_UNSAVED_MESSAGE,

  SAVING_MESSAGES_REQUEST,
  SAVING_MESSAGES_ERRORS,
  SAVING_MESSAGES_SUCCESS
} from '../constants/messageActionTypes';

const initialState = {
  isFetching: false,
  isSaving: false,
  roomId: '',
  // messages: [],
  unsaved: []
};

const messageReducer = (state = initialState, action) => {
  switch(action.type) {
    case MESSAGES_BY_ROOM_ID_REQUEST:
      return {
        ...state,
        isFetching: true,
        roomId: action.roomId  
      }

    case MESSAGES_BY_ROOM_ID_ERRORS:
      return {
        ...state,
        isFetching: false  
      }

    case MESSAGES_BY_ROOM_ID_SUCCESS:
      const fetchedResults = {
        ...state,
        isFetching: false
        // ,messages: action.messages
      };

      if(action.messages.length > 0) {
        const { roomId } = action.messages[0];
        fetchedResults[roomId] = action.messages;
      }
      
      return fetchedResults;
    
    case ADD_OWN_UNSAVED_MESSAGE:
      action.message.date = moment.utc();
      return {
        ...state,
        unsaved: [ ...state.unsaved, action.message ]
      };

    case ADD_NEW_MESSAGE:
      action.message.date = moment.utc();

      const newMsgAdded = {...state };

      if(action.message.roomId) {
        const { roomId } = action.message;
        const messages = state[roomId] || [];
        newMsgAdded[roomId] = [
          ...messages, 
          action.message
        ]
      }

      return newMsgAdded;

    case SAVING_MESSAGES_REQUEST:
      return {
        ...state,
        isSaving: true
      };

    case SAVING_MESSAGES_ERRORS:
      return {
        ...state,
        isSaving: false
      }

    case SAVING_MESSAGES_SUCCESS:
      return {
        ...state,
        isSaving: false,
        unsaved: []
      }

    case USER_LOGOUT:
      return { ...initialState }

    default:
      return state;
  }
}

export default messageReducer;
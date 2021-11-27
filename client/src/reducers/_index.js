import { combineReducers } from 'redux';

// Load reducers
import errorReducer from './errorReducer';

import registerReducer from './registerReducer';
import authReducer from './authReducer';

import userReducer from './userReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import connectionReducer from './connectionsReducer';
import fileReducer from './fileReducer';
import searchReducer from './searchReducer';
import filterReducer from './filterReducer';
import roomReducer from './roomReducer';
import messageReducer from './messageReducer';
import chatProfileReducer from './chatProfileReducer';

import visitingProfileReducer from './visitingProfileReducer';
import visitingConnectionsReducer from './visitingConnectionsReducer';
import visitingPostsReducer from './visitingPostsReducer';


const rootReducer = combineReducers({
  register: registerReducer,
  auth: authReducer,
  errors: errorReducer,
  user: userReducer,
  profile: profileReducer,
  posts: postReducer,
  search: searchReducer,
  filters: filterReducer,
  files: fileReducer,
  connections: connectionReducer,
  room: roomReducer,
  message: messageReducer,
  chatProfile: chatProfileReducer,
  visitingProfile: visitingProfileReducer,
  visitingConnections: visitingConnectionsReducer,
  visitingPosts: visitingPostsReducer
});

export default rootReducer;
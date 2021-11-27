import thunk from 'redux-thunk'; 
import { createStore, applyMiddleware, compose } from 'redux';

// Load reducer
import rootReducer from './reducers/_index';

const initialState = {};
const middleWares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleWares))
);

export default store;

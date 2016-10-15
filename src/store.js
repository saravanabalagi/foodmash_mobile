import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/reducer';

// Centralized application state
// For more information visit http://redux.js.org/
const store = createStore(rootReducer, applyMiddleware(thunk, logger()));

export default store;
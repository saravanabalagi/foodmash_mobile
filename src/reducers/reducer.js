import {combineReducers} from 'redux'
import userReducer from './user/userReducer'
import locationReducer from './location/locationReducer';

export default combineReducers({
    user: userReducer,
    location: locationReducer
});
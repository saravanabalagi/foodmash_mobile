import {combineReducers} from 'redux'

import addressReducer from './address/addressReducer';
import cartReducer from './cart/cartReducer';
import cityReducer from './city/cityReducer';
import comboReducer from './combo/comboReducer';
import dishReducer from './dish/dishReducer';
import locationReducer from './location/locationReducer';
import orderReducer from './order/orderReducer';
import userReducer from './user/userReducer'

export default combineReducers({
    address: addressReducer,
    cart: cartReducer,
    city: cityReducer,
    combo: comboReducer,
    dish: dishReducer,
    location: locationReducer,
    order: orderReducer,
    user: userReducer
});
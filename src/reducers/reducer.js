import {combineReducers} from 'redux'

import addressReducer from './address/addressReducer';
import cartReducer from './cart/cartReducer';
import cityReducer from './city/cityReducer';
import comboReducer from './combo/comboReducer';
import dishCategoryReducer from './dishCategory/dishCategoryReducer';
import dishReducer from './dish/dishReducer';
import dishVariantReducer from './dishVariant/dishVariantReducer';
import variantReducer from './variant/variantReducer';
import variantCategoryReducer from './variantCategory/variantCategoryReducer';
import locationReducer from './location/locationReducer';
import orderReducer from './order/orderReducer';
import userReducer from './user/userReducer'

export default combineReducers({
    address: addressReducer,
    cart: cartReducer,
    city: cityReducer,
    combo: comboReducer,
    dishCategory: dishCategoryReducer,
    dish: dishReducer,
    dishVariant: dishVariantReducer,
    variant: variantReducer,
    variantCategory: variantCategoryReducer,
    location: locationReducer,
    order: orderReducer,
    user: userReducer
});
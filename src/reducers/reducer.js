import {combineReducers} from 'redux'

import cartReducer from './cart/cartReducer';
import cityReducer from './city/cityReducer';
import dishCategoryReducer from './dishCategory/dishCategoryReducer';
import dishReducer from './dish/dishReducer';
import dishVariantReducer from './dishVariant/dishVariantReducer';
import variantReducer from './variant/variantReducer';
import variantCategoryReducer from './variantCategory/variantCategoryReducer';
import restaurantReducer from './restaurant/restaurantReducer';
import addOnReducer from './addOn/addOnReducer';
import addOnLinkReducer from './addOnLink/addOnLinkReducer';
import addOnTypeReducer from './addOnType/addOnTypeReducer';
import addOnTypeLinkReducer from './addOnTypeLink/addOnTypeLinkReducer';
import orderStatusReducer from './orderStatus/orderStatusReducer';
import paymentMethodReducer from './paymentMethod/paymentMethodReducer';
import locationReducer from './location/locationReducer';
import orderReducer from './order/orderReducer';
import sessionReducer from './session/sessionReducer';
import userReducer from './user/userReducer';

export default combineReducers({
    cart: cartReducer,
    city: cityReducer,
    dishCategory: dishCategoryReducer,
    dish: dishReducer,
    dishVariant: dishVariantReducer,
    variant: variantReducer,
    variantCategory: variantCategoryReducer,
    restaurant: restaurantReducer,
    addOn: addOnReducer,
    addOnLink: addOnLinkReducer,
    addOnType: addOnTypeReducer,
    addOnTypeLink: addOnTypeLinkReducer,
    orderStatus: orderStatusReducer,
    paymentMethod: paymentMethodReducer,
    location: locationReducer,
    order: orderReducer,
    session: sessionReducer,
    user: userReducer
});
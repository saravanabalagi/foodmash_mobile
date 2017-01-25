import axios from 'axios';
import store from '../../store';

import {Actions, ActionConst} from 'react-native-router-flux';
import {fetchOrdersAndfetchOrder} from '../order/orderActions';
import {getPrice} from '../dishCategory/dishCategoryActions';

export function fetchCart() {
    const url = '/cart';
    return (dispatch) => {
        dispatch({type: "FETCH_CART_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_CART_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_CART_FAILED", payload: error }); });
    };
}

export function submitAddress() {
    const url = '/cart/set_address';
    const address_id = store.getState().cart.address_id;
    return (dispatch) => {
        dispatch({type: "SUBMIT_ADDRESS_IN_PROGRESS"});
        axios.post(url, {address_id: address_id})
            .then((response) => { dispatch({ type: "SUBMIT_ADDRESS_FULFILLED", payload: response.data }); Actions.checkout(); })
            .catch((error) => { dispatch({ type: "SUBMIT_ADDRESS_FAILED", payload: error }); });
    };
}

export function submitCart() {
    const url = '/cart';
    const cart = store.getState().cart;
    return (dispatch) => {
        dispatch({type: "SUBMIT_CART_IN_PROGRESS"});
        axios.post(url, { dish_variants: cart.dish_variants})
            .then((response) => { dispatch({ type: "SUBMIT_CART_FULFILLED", payload: response.data }); dispatch(submitAddress()); })
            .catch((error) => { dispatch({ type: "SUBMIT_CART_FAILED", payload: error }); });
    };
}

export function plusOneDishVariantToCart(dish_variant) { return (dispatch) => { dispatch({type: "PLUS_ONE_DISH_VARIANT", dish_variant: dish_variant}); }; }
export function minusOneDishVariantToCart(dish_variant) { return (dispatch) => { dispatch({type: "MINUS_ONE_DISH_VARIANT", dish_variant: dish_variant}); }; }

export function setAddress(address_id) { return (dispatch) => { dispatch({type: "SET_ADDRESS_FOR_CART", address_id: address_id}) } }

export function purchaseCart() {
    const url = '/cart/purchase/cod';
    const cart = store.getState().cart;
    return (dispatch) => {
        dispatch({type: "PURCHASE_CART_IN_PROGRESS"});
        axios.post(url)
            .then((response) => { dispatch({ type: "PURCHASE_CART_FULFILLED", payload: response.data });
                                    //TODO: clear cart stack and bring it back to inCart
                                    dispatch(fetchOrdersAndfetchOrder(cart.values.id)); Actions.orders();
                                    dispatch({type: "RESET_CART"}); })
            .catch((error) => { dispatch({ type: "PURCHASE_CART_FAILED", payload: error }); });
    };
}

export function getTotal() {
    return store.getState().cart.dish_variants.reduce((total, dish_variant)=>{
        return total +  getPrice(dish_variant.id, dish_variant.dish_id, dish_variant.dish_category_id)*dish_variant.quantity;
    },0);
}

export function getTotalItems() {
    return store.getState().cart.dish_variants.reduce((total, dish_variant)=>{
        return total +  dish_variant.quantity;
    },0);
}

export function getDishQuantity(id) {
    return store.getState().cart.dish_variants.reduce((quantity, dishVariant) => {
        return (dishVariant.dish_id === id)? quantity+dishVariant.quantity : quantity;
    }, 0);
}


// export function addComboToCart(combo) {
//     return (dispatch) => {
//         dispatch({type: "ADD_DISH_VARIANT_TO_CART", combo: combo});
//     };
// }


import axios from 'axios';
import store from '../../store';

import {Actions} from 'react-native-router-flux';
import {fetchOrdersAndfetchOrder} from '../order/orderActions';

export function fetchCart() {
    const url = '/cart';
    return (dispatch) => {
        dispatch({type: "FETCH_CART_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_CART_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_CART_FAILED", payload: error }); });
    };
}

export function submitCart() {
    const url = '/cart';
    const cart = store.getState().cart;
    return (dispatch) => {
        dispatch({type: "SUBMIT_CART_IN_PROGRESS"});
        axios.post(url, { dish_variants: cart.dishVariants})
            .then((response) => { dispatch({ type: "SUBMIT_CART_FULFILLED", payload: response.data }); Actions.checkout(); })
            .catch((error) => { dispatch({ type: "SUBMIT_CART_FAILED", payload: error }); });
    };
}

export function plusOneDishVariantToCart(dishVariant) { return (dispatch) => { dispatch({type: "PLUS_ONE_DISH_VARIANT", dishVariant: dishVariant}); }; }
export function minusOneDishVariantToCart(dishVariant) { return (dispatch) => { dispatch({type: "MINUS_ONE_DISH_VARIANT", dishVariant: dishVariant}); }; }

export function purchaseCart() {
    const url = '/cart/purchase/cod';
    const cart = store.getState().cart;
    return (dispatch) => {
        dispatch({type: "PURCHASE_CART_IN_PROGRESS"});
        axios.post(url)
            .then((response) => { dispatch({ type: "PURCHASE_CART_FULFILLED", payload: response.data });
                                    //TODO: clear cart stack and bring it back to inCart
                                    dispatch(fetchOrdersAndfetchOrder(cart.values.id));
                                    Actions.pop();
                                    Actions.orders();
                                    dispatch({type: "RESET_CART"}); })
            .catch((error) => { dispatch({ type: "PURCHASE_CART_FAILED", payload: error }); });
    };
}

export function getTotal() {
    let cartDishVariants = store.getState().cart.dishVariants;
    let dishVariants = store.getState().dishVariant.dishVariants;
    return cartDishVariants.reduce((total, dishVariant)=>{
        return total + dishVariants[dishVariant.id].price*dishVariant.quantity;
    },0);
}

export function getTotalItems() {
    return store.getState().cart.dishVariants.reduce((total, dish_variant)=>{
        return total +  dish_variant.quantity;
    },0);
}

export function getDishQuantity(id) {
    let cartDishVariants = store.getState().cart.dishVariants;
    let dishVariants = store.getState().dishVariant.dishVariants;
    return cartDishVariants.reduce((quantity, dishVariant) => {
        return (dishVariants[dishVariant.id].dish_id === id)? quantity+dishVariant.quantity : quantity;
    }, 0);
}


// export function addComboToCart(combo) {
//     return (dispatch) => {
//         dispatch({type: "ADD_DISH_VARIANT_TO_CART", combo: combo});
//     };
// }


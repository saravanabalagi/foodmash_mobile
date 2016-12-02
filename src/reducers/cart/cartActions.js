import axios from 'axios';
import store from '../../store';

export function fetchCart() {
    const url = '/cart';
    return (dispatch) => {
        dispatch({type: "FETCH_CART_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_CART_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_CART_FAILED", payload: error }); });
    };
}

export function setAddress(address_id) {
    const url = '/cart/set_address';
    return (dispatch) => {
        dispatch({type: "SET_ADDRESS_IN_PROGRESS"});
        axios.post(url, {address_id: address_id})
            .then((response) => { dispatch({ type: "SET_ADDRESS_FULFILLED", payload: response.data }); })
            .catch((error) => { dispatch({ type: "SET_ADDRESS_FAILED", payload: error }); });
    };
}

export function submitCart() {
    const url = '/cart';
    const cart = store.getState().cart;
    return (dispatch) => {
        dispatch({type: "SUBMIT_CART_IN_PROGRESS"});
        axios.post(url, { dish_variants: cart.dish_variants})
            .then((response) => { dispatch({ type: "SUBMIT_CART_FULFILLED", payload: response.data }); })
            .catch((error) => { dispatch({ type: "SUBMIT_CART_FAILED", payload: error }); });
    };
}

export function plusOneDishVariantToCart(dish_variant) { return (dispatch) => { dispatch({type: "PLUS_ONE_DISH_VARIANT", dish_variant: dish_variant}); }; }
export function minusOneDishVariantToCart(dish_variant) { return (dispatch) => { dispatch({type: "MINUS_ONE_DISH_VARIANT", dish_variant: dish_variant}); }; }

export function chooseAddressForCart(address_id) { return (dispatch) => { dispatch({type: "CHOOSE_ADDRESS_FOR_CART", address_id: address_id}) } }

// export function addComboToCart(combo) {
//     return (dispatch) => {
//         dispatch({type: "ADD_DISH_VARIANT_TO_CART", combo: combo});
//     };
// }


import axios from 'axios';

export function fetchCart() {
    const url = '/cart';
    return (dispatch) => {
        dispatch({type: "FETCH_CART_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_CART_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_CART_FAILED", payload: error }); });
    };
}

export function submitCart(cart) {
    const url = '/cart';
    return (dispatch) => {
        dispatch({type: "SUBMIT_CART_IN_PROGRESS"});
        axios.post(url, cart)
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


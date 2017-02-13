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
        axios.post(url, { dish_variants: cart.orderItems})
            .then((response) => { dispatch({ type: "SUBMIT_CART_FULFILLED", payload: response.data }); Actions.checkout(); })
            .catch((error) => { dispatch({ type: "SUBMIT_CART_FAILED", payload: error }); });
    };
}

export function plusOneDishVariantToCart(orderItem) { return (dispatch) => { dispatch({type: "PLUS_ONE_DISH_VARIANT", orderItem: orderItem}); }; }
export function minusOneDishVariantToCart(orderItem) { return (dispatch) => { dispatch({type: "MINUS_ONE_DISH_VARIANT", orderItem: orderItem}); }; }
export function minusOneDishVariantLenientToCart(orderItem) { return (dispatch) => { dispatch({type: "MINUS_ONE_DISH_VARIANT_LENIENT", orderItem: orderItem}); }; }

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
    let orderItems = store.getState().cart.orderItems;
    let dishVariants = store.getState().dishVariant.dishVariants;
    let addOnLinks = store.getState().addOnLink.addOnLinks;
    return orderItems.reduce((total, orderItem)=>{
        return total + orderItem.add_on_link_ids.reduce((price, addOnLinkId)=> price+parseFloat(addOnLinks[addOnLinkId].price),parseFloat(dishVariants[orderItem.dish_variant_id].price))*orderItem.quantity;
    },0);
}

export function getTotalItems() {
    return store.getState().cart.orderItems.reduce((total, orderItem)=>{
        return total +  orderItem.quantity;
    },0);
}

export function getDishQuantity(id) {
    let orderItems = store.getState().cart.orderItems;
    let dishVariants = store.getState().dishVariant.dishVariants;
    return orderItems.reduce((quantity, orderItem) => {
        return (dishVariants[orderItem.dish_variant_id].dish_id === id)? quantity+orderItem.quantity : quantity;
    }, 0);
}

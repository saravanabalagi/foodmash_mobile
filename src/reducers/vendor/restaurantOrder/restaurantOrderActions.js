import axios from 'axios';
import store from '../../../store';

export function fetchRestaurantOrders() {
    const url = '/vendor/restaurant_orders';
    return (dispatch) => {
        if(store.getState().vendor.restaurantOrder.inProgress.includes(0)) return;
        dispatch({type: "FETCH_RESTAURANT_ORDER_IN_PROGRESS", id: 0});
        axios.get(url)
            .then((response) => {
                dispatch({type: "FETCH_RESTAURANT_ORDERS_FULFILLED", id: 0});
                response.data.forEach(restaurantOrder => dispatch({type: "FETCH_RESTAURANT_ORDER_FULFILLED", payload: restaurantOrder, id: restaurantOrder.id})); })
            .catch((error) => { dispatch({ type: "FETCH_RESTAURANT_ORDER_FAILED", payload: error, id: 0}); });
    };
}

export function fetchRestaurantOrder(id) {
    const url = '/vendor/restaurant_orders/' + id.toString();
    return (dispatch) => {
        if(store.getState().order.inProgress.includes(id)) return;
        dispatch({type: "FETCH_RESTAURANT_ORDER_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({type: "FETCH_RESTAURANT_ORDER_FULFILLED", payload: response.data, id: id}); })
            .catch((error) => { dispatch({type: "FETCH_RESTAURANT_ORDER_FAILED", payload: error, id: id}); });
    };
}

export function makeRestaurantOrder(id, action) {
    let url = '/vendor/restaurant_orders/' + id.toString();
    switch(action) {
        case "approve": url+='/approve'; break;
        case "reject": url+='/reject'; break;
        case "ready": url+='/ready'; break;
        case "collected": url+='/collected'; break;
        default: return;
    }
    return (dispatch) => {
        if(store.getState().order.inProgress.includes(id)) return;
        dispatch({type: "FETCH_RESTAURANT_ORDER_IN_PROGRESS", id: id});
        axios.patch(url)
            .then((response) => { dispatch({type: "FETCH_RESTAURANT_ORDER_FULFILLED", payload: response.data, id: id}); })
            .catch((error) => { dispatch({type: "FETCH_RESTAURANT_ORDER_FAILED", payload: error, id: id}); });
    }
}

export function updateRestaurantOrder(restaurantOrder) {
    return (dispatch) => {
        dispatch({type: "FETCH_RESTAURANT_ORDER_FULFILLED", payload: restaurantOrder, id: restaurantOrder.id});
    }
}
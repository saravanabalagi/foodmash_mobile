import axios from 'axios';
import store from '../../store';

export function fetchOrders() {
    const url = '/orders';
    return (dispatch) => {
        if(store.getState().order.inProgress.includes(0)) return;
        dispatch({type: "FETCH_ORDER_IN_PROGRESS", id: 0});
        axios.get(url)
            .then((response) => {
                dispatch({type: "FETCH_ORDERS_FULFILLED", id: 0});
                response.data.forEach(order => dispatch({type: "FETCH_ORDER_FULFILLED", payload: order, id: order.id})); })
            .catch((error) => { dispatch({ type: "FETCH_ORDER_FAILED", payload: error, id: 0}); });
    };
}

export function fetchOrder(id) {
    const url = '/orders/' + id.toString();
    return (dispatch) => {
        if(store.getState().order.inProgress.includes(id)) return;
        dispatch({type: "FETCH_ORDER_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({type: "FETCH_ORDER_FULFILLED", payload: response.data, id: id}); })
            .catch((error) => { dispatch({type: "FETCH_ORDER_FAILED", payload: error, id: id}); });
    };
}
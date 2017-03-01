import axios from 'axios';
import store from '../../store';

export function fetchOrders(page) {
    if(page == null) page=1;
    const url = '/orders' + '?page=' + page;
    return (dispatch) => {
        if(store.getState().order.inProgress.includes(-page)) return;
        dispatch({type: "FETCH_ORDER_IN_PROGRESS", id: -page});
        axios.get(url)
            .then((response) => {
                let totalPages = parseInt(response.headers['pagination-total-pages']);
                let totalCount = parseInt(response.headers['pagination-total-count']);
                dispatch({type: "FETCH_ORDERS_FULFILLED", id: -page, totalPages: totalPages, totalCount: totalCount});
                response.data.forEach(order => dispatch({type: "FETCH_ORDER_FULFILLED", payload: order, id: order.id})); })
            .catch((error) => { dispatch({ type: "FETCH_ORDER_FAILED", payload: error, id: -page}); });
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

export function updateOrder(order) {
    return (dispatch) => {
        dispatch({type: "FETCH_ORDER_FULFILLED", payload: order, id: order.id});
    }
}
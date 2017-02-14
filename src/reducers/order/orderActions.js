import axios from 'axios';
import {Actions, ActionConst} from 'react-native-router-flux';

export function fetchOrders() {
    const url = '/orders';
    return (dispatch) => {
        dispatch({type: "FETCH_ORDERS_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_ORDERS_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_ORDERS_FAILED", payload: error }); });
    };
}

export function fetchOrder(id) {
    const url = '/orders/' + id.toString();
    return (dispatch) => {
        dispatch({type: "FETCH_ORDER_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_ORDER_FULFILLED", payload: response.data, id: id }); })
            .catch((error) => { dispatch({ type: "FETCH_ORDER_FAILED", payload: error, id: id }); });
    };
}

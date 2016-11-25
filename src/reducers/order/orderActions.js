import axios from 'axios';

export function fetchOrders() {
    const url = '/orders';
    return (dispatch) => {
        dispatch({type: "FETCH_ORDERS_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_ORDERS_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_ORDERS_FAILED", payload: error }); });
    };
}
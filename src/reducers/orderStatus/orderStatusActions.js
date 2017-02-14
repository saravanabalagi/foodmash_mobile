import axios from 'axios';
import store from '../../store';

export function fetchOrderStatus(id) {
    const url = '/order_statuses/' + id.toString();
    return (dispatch) => {
        if(store.getState().orderStatus.orderStatuses[id] != null
            || store.getState().orderStatus.inProgress.includes(id)) return;
        dispatch({type: "FETCH_ORDER_STATUS_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({type: "FETCH_ORDER_STATUS_FULFILLED", payload: response.data, id: id}); })
            .catch((error) => { dispatch({type: "FETCH_ORDER_STATUS_FAILED", payload: error, id: id}); });
    };
}
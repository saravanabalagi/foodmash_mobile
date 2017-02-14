import axios from 'axios';
import store from '../../store';

export function fetchPaymentMethod(id) {
    const url = '/payment_methods/' + id.toString();
    return (dispatch) => {
        if(store.getState().paymentMethod.paymentMethods[id] != null
            || store.getState().paymentMethod.inProgress.includes(id)) return;
        dispatch({type: "FETCH_PAYMENT_METHOD_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({type: "FETCH_PAYMENT_METHOD_FULFILLED", payload: response.data, id: id}); })
            .catch((error) => { dispatch({type: "FETCH_PAYMENT_METHOD_FAILED", payload: error, id: id}); });
    };
}
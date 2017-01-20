import axios from 'axios';
import store from '../../store';

export function fetchVariant(id) {
    const url = '/variants/' + id.toString();
    return (dispatch) => {
        if(store.getState().variant.variants[id] != null) return;
        dispatch({type: "FETCH_VARIANT_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_VARIANT_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_VARIANT_FAILED", payload: error }); });
    };
}
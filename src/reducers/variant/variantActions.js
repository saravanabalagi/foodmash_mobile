import axios from 'axios';
import store from '../../store';

export function fetchVariant(id) {
    const url = '/variants/' + id.toString();
    return (dispatch) => {
        if(store.getState().variant.variants[id] != null
            || store.getState().variant.inProgress.includes(id)) return;
        dispatch({type: "FETCH_VARIANT_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({type: "FETCH_VARIANT_FULFILLED", payload: response.data, id: id}); })
            .catch((error) => { dispatch({type: "FETCH_VARIANT_FAILED", payload: error, id: id}); });
    };
}
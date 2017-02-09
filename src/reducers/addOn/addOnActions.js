import axios from 'axios';
import store from '../../store';

export function fetchAddOn(id) {
    const url = '/add_ons/' + id.toString();
    return (dispatch) => {
        if(store.getState().addOn.addOns[id] != null
            || store.getState().addOn.inProgress.includes(id)) return;
        dispatch({type: "FETCH_ADD_ON_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({type: "FETCH_ADD_ON_FULFILLED", payload: response.data, id: id}); })
            .catch((error) => { dispatch({type: "FETCH_ADD_ON_FAILED", payload: error, id: id}); });
    };
}
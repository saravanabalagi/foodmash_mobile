import axios from 'axios';
import store from '../../store';

export function fetchAddOn(id) {
    const url = '/add_ons/' + id.toString();
    return (dispatch) => {
        if(store.getState().addOn.addOns[id] != null) return;
        dispatch({type: "FETCH_ADD_ON_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_ADD_ON_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_ADD_ON_FAILED", payload: error }); });
    };
}
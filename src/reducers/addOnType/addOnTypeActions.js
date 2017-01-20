import axios from 'axios';
import store from '../../store';

export function fetchAddOnType(id) {
    const url = '/add_on_types/' + id.toString();
    return (dispatch) => {
        if(store.getState().addOnType.addOnTypes[id] != null) return;
        dispatch({type: "FETCH_ADD_ON_TYPE_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_ADD_ON_TYPE_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_ADD_ON_TYPE_FAILED", payload: error }); });
    };
}
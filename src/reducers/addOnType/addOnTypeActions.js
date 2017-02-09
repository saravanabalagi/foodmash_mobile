import axios from 'axios';
import store from '../../store';

export function fetchAddOnType(id) {
    const url = '/add_on_types/' + id.toString();
    return (dispatch) => {
        if(store.getState().addOnType.addOnTypes[id] != null
            || store.getState().addOnType.inProgress.includes(id)) return;
        dispatch({type: "FETCH_ADD_ON_TYPE_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({type: "FETCH_ADD_ON_TYPE_FULFILLED", payload: response.data, id: id}); })
            .catch((error) => { dispatch({type: "FETCH_ADD_ON_TYPE_FAILED", payload: error, id: id}); });
    };
}
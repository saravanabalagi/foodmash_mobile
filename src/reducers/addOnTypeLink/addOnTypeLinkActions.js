import axios from 'axios';
import store from '../../store';

export function fetchAddOnTypeLink(id) {
    const url = '/add_on_type_links/' + id.toString();
    return (dispatch) => {
        if(store.getState().addOnTypeLink.addOnTypeLinks[id] != null
            || store.getState().addOnTypeLink.inProgress.includes(id)) return;
        dispatch({type: "FETCH_ADD_ON_TYPE_LINK_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({type: "FETCH_ADD_ON_TYPE_LINK_FULFILLED", payload: response.data, id: id}); })
            .catch((error) => { dispatch({type: "FETCH_ADD_ON_TYPE_LINK_FAILED", payload: error, id: id}); });
    };
}
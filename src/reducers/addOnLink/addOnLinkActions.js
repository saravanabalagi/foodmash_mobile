import axios from 'axios';
import store from '../../store';

export function fetchAddOnLink(id) {
    const url = '/add_on_links/' + id.toString();
    return (dispatch) => {
        if(store.getState().addOnLink.addOnLinks[id] != null
            || store.getState().addOnLink.inProgress.includes(id)) return;
        dispatch({type: "FETCH_ADD_ON_LINK_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({type: "FETCH_ADD_ON_LINK_FULFILLED", payload: response.data, id: id}); })
            .catch((error) => { dispatch({type: "FETCH_ADD_ON_LINK_FAILED", payload: error, id: id}); });
    };
}
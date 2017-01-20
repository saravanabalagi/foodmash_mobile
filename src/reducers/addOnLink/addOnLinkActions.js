import axios from 'axios';
import store from '../../store';

export function fetchAddOnLink(id) {
    const url = '/add_on_links/' + id.toString();
    return (dispatch) => {
        if(store.getState().addOnLink.addOnLinks[id] != null) return;
        dispatch({type: "FETCH_ADD_ON_LINK_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_ADD_ON_LINK_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_ADD_ON_LINK_FAILED", payload: error }); });
    };
}
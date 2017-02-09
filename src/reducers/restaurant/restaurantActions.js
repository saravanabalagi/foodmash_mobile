import axios from 'axios';
import store from '../../store';

export function fetchRestaurant(id) {
    const url = '/restaurants/' + id.toString();
    return (dispatch) => {
        if(store.getState().restaurant.restaurants[id] != null
            || store.getState().restaurant.inProgress.includes(id)) return;
        dispatch({type: "FETCH_RESTAURANT_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({type: "FETCH_RESTAURANT_FULFILLED", payload: response.data, id: id}); })
            .catch((error) => { dispatch({type: "FETCH_RESTAURANT_FAILED", payload: error, id: id}); });
    };
}
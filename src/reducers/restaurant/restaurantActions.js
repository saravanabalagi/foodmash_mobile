import axios from 'axios';
import store from '../../store';

export function fetchRestaurant(id) {
    const url = '/restaurants/' + id.toString();
    return (dispatch) => {
        if(store.getState().restaurant.restaurants[id] != null) return;
        dispatch({type: "FETCH_RESTAURANT_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_RESTAURANT_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_RESTAURANT_FAILED", payload: error }); });
    };
}
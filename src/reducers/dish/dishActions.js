import axios from 'axios';
import store from '../../store';

export function fetchDish(id) {
    const url = '/dishes/' + id.toString();
    return (dispatch) => {
        if(store.getState().dish.dishes[id] != null) return;
        dispatch({type: "FETCH_DISH_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_DISH_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_DISH_FAILED", payload: error }); });
    };
}
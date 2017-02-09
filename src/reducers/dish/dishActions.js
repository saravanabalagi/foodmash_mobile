import axios from 'axios';
import store from '../../store';

export function fetchDish(id) {
    const url = '/dishes/' + id.toString();
    return (dispatch) => {
        if(store.getState().dish.dishes[id] != null
            || store.getState().dish.inProgress.includes(id)) return;
        dispatch({type: "FETCH_DISH_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({type: "FETCH_DISH_FULFILLED", payload: response.data, id: id}); })
            .catch((error) => { dispatch({type: "FETCH_DISH_FAILED", payload: error, id: id}); });
    };
}
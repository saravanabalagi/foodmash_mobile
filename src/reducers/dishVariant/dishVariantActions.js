import axios from 'axios';
import store from '../../store';

export function fetchDishVariant(id) {
    const url = '/dish_variants/' + id.toString();
    return (dispatch) => {
        if(store.getState().dishVariant.dishVariants[id] != null) return;
        dispatch({type: "FETCH_DISH_VARIANT_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_DISH_VARIANT_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_DISH_VARIANT_FAILED", payload: error }); });
    };
}
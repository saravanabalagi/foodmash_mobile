import axios from 'axios';
import store from '../../store';

export function fetchDishCategories() {
    const url = '/dish_categories';
    return (dispatch) => {
        if(Object.keys(store.getState().dishCategory.dishCategories).length !== 0) return;
        dispatch({type: "FETCH_DISH_CATEGORIES_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({type: "FETCH_DISH_CATEGORIES_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_DISH_CATEGORIES_FAILED", payload: error }); });
    };
}

export function fetchDishCategory(id) {
    const url = '/dish_categories' + id.toString();
    return (dispatch) => {
        if(store.getState().dishCategory.dishCategories[id] != null) return;
        dispatch({type: "FETCH_DISH_CATEGORY_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({type: "FETCH_DISH_CATEGORY_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_DISH_CATEGORY_FAILED", payload: error }); });
    };
}
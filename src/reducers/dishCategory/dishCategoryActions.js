import axios from 'axios';
import store from '../../store';

export function fetchDishCategories() {
    const url = '/dish_categories';
    return (dispatch) => {
        if(Object.keys(store.getState().dishCategory.dishCategories).length !== 0
            || store.getState().dishCategory.inProgress.includes(0)) return;
        dispatch({type: "FETCH_DISH_CATEGORY_IN_PROGRESS", id: 0});
        axios.get(url)
            .then((response) => {
                dispatch({type: "FETCH_DISH_CATEGORIES_FULFILLED", id: 0});
                response.data.forEach(dishCategory => dispatch({type: "FETCH_DISH_CATEGORY_FULFILLED", payload: dishCategory, id: dishCategory.id})); })
            .catch((error) => { dispatch({ type: "FETCH_DISH_CATEGORY_FAILED", payload: error, id: 0}); });
    };
}

export function fetchDishCategory(id) {
    const url = '/dish_categories' + id.toString();
    return (dispatch) => {
        if(store.getState().dishCategory.dishCategories[id] != null
            || store.getState().dishCategory.inProgress.includes(id)) return;
        dispatch({type: "FETCH_DISH_CATEGORY_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({type: "FETCH_DISH_CATEGORY_FULFILLED", payload: response.data, id: id}); })
            .catch((error) => { dispatch({type: "FETCH_DISH_CATEGORY_FAILED", payload: error, id: id}); });
    };
}

export function dropDishCategories() { return dispatch => dispatch({type: "DROP_DISH_CATEGORIES"}); }
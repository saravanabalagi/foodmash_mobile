import axios from 'axios';

export function fetchDishCategories() {
    const url = '/dish_categories';
    return (dispatch) => {
        dispatch({type: "FETCH_DISH_CATEGORIES_IN_PROGRESS"});
        axios.get(url)
            .then((response) => {
                dispatch({ type: "FETCH_DISH_CATEGORIES_FULFILLED", payload: response.data});
                if (response.data.length > 0) dispatch(selectDishCategoryAndFetchDishes(response.data[0].id));
            })
            .catch((error) => { dispatch({ type: "FETCH_DISH_CATEGORIES_FAILED", payload: error }); });
    };
}

export function selectDishCategoryAndFetchDishes(id) {
    const url = '/dish_categories/' + id.toString() + '/dishes';
    return (dispatch) => {
        dispatch({type: "SELECT_DISH_CATEGORY", payload: id});
        dispatch({type: "FETCH_DISHES_FOR_CATEGORY_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_DISHES_FOR_CATEGORY_FULFILLED", payload: response.data, id: id}); })
            .catch((error) => { dispatch({ type: "FETCH_DISHES_FOR_CATEGORY_FAILED", payload: error, id: id }); });
    }
}

export function fetchDish(dish_id, category_id) {
    const url = '/dishes/'+dish_id.toString();
    return (dispatch) => {
        dispatch({type: "FETCH_DISH_IN_PROGRESS", id: category_id, dish_id: dish_id});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_DISH_FULFILLED", payload: response.data, id: category_id, dish_id: dish_id }); })
            .catch((error) => { dispatch({ type: "FETCH_DISH_FAILED", payload: error, id: category_id, dish_id: dish_id }); });
    };
}
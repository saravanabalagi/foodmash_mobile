import axios from 'axios';

export function fetchDishCategories() {
    const url = '/dish_categories';
    return (dispatch) => {
        dispatch({type: "FETCH_DISH_CATEGORIES_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_DISH_CATEGORIES_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_DISH_CATEGORIES_FAILED", payload: error }); });
    };
}

export function selectDishCategory(id) { return (dispatch) => { dispatch({type: "SELECT_DISH_CATEGORY", payload: id}); }}


// export function fetchDishesForCategory(id) {
//     const url = '/dish_categories/' + id.toString();
//     return (dispatch) => {
//         dispatch({type: "FETCH_DISHES_FOR_CATEGORY_IN_PROGRESS"});
//         axios.get(url)
//             .then((response) => { dispatch({ type: "FETCH_DISHES_FOR_CATEGORY_FULFILLED", payload: response.data}); })
//             .catch((error) => { dispatch({ type: "FETCH_DISHES_FOR_CATEGORY_FAILED", payload: error }); });
//     };
// }
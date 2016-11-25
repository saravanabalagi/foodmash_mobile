import axios from 'axios';

export function fetchDishes() {
    const url = '/dishes';
    return (dispatch) => {
        dispatch({type: "FETCH_DISHES_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_DISHES_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_DISHES_FAILED", payload: error }); });
    };
}
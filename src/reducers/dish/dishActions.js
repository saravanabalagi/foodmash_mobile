import axios from 'axios';

export function fetchDish(id) {
    const url = '/dishes/'+id.toString();
    return (dispatch) => {
        dispatch({type: "FETCH_DISH_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_DISH_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_DISH_FAILED", payload: error }); });
    };
}
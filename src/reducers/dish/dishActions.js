import axios from 'axios';

export function fetchDish(id) {
    const url = '/dishes/'+id.toString();
    return (dispatch) => {
        dispatch({type: "FETCH_DISH_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_DISH_FULFILLED", payload: response.data, id: id }); })
            .catch((error) => { dispatch({ type: "FETCH_DISH_FAILED", payload: error, id: id }); });
    };
}
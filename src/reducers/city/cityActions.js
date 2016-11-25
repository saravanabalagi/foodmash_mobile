import axios from 'axios';

export function fetchCities() {
    const url = '/cities';
    return (dispatch) => {
        dispatch({type: "FETCH_CITIES_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_CITIES_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_CITIES_FAILED", payload: error }); });
    };
}
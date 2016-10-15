import axios from 'axios';

export function fetchLocations() {
    const url = '/locations';
    return (dispatch) => {
        dispatch({type: "PROCESSING"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_LOCATIONS_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_LOCATIONS_FAILED", payload: error }); });
    };
}
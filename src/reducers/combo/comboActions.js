import axios from 'axios';

export function fetchCombos() {
    const url = '/combos';
    return (dispatch) => {
        dispatch({type: "FETCH_COMBOS_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_COMBOS_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_COMBOS_FAILED", payload: error }); });
    };
}
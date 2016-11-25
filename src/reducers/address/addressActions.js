import axios from 'axios';

export function fetchAddresses() {
    const url = '/addresses';
    return (dispatch) => {
        dispatch({type: "FETCH_ADDRESSES_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_ADDRESSES_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_ADDRESSES_FAILED", payload: error }); })
    }
}
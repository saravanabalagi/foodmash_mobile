import axios from 'axios';

export function fetchUser() {
    const url = '/users/me';
    return (dispatch) => {
        dispatch({type: "FETCH_USER_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_USER_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_USER_FAILED", payload: error }); });
    };
}

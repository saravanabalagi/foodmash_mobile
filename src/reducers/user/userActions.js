import axios from 'axios';

export function fetchJwt(credentials) {
    const url = '/auth';
    return (dispatch) => {
        dispatch({type: "FETCH_JWT_IN_PROGRESS"});
        axios.post(url,{ auth: {email: credentials.email, password: credentials.password}})
            .then((response) => { dispatch({ type: "FETCH_JWT_FULFILLED", payload: response.data.jwt}); })
            .catch((error) => { dispatch({ type: "FETCH_JWT_FAILED", payload: error }); });
    };
}

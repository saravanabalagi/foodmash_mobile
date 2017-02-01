import axios from 'axios';
import store from '../../store';

export function fetchJwt(credentials) {
    const url = '/auth';
    return (dispatch) => {
        dispatch({type: "FETCH_JWT_IN_PROGRESS"});
        axios.post(url,{ auth: {email: credentials.email, password: credentials.password}})
            .then((response) => { dispatch({ type: "FETCH_JWT_FULFILLED", payload: response.data.jwt}); })
            .catch((error) => { dispatch({ type: "FETCH_JWT_FAILED", payload: error }); });
    };
}

export function signupUser(userDetails) {
    const url = '/users/create';
    return (dispatch) => {
        dispatch({type: "SIGNUP_USER_IN_PROGRESS"});
        let session = store.getState().session;
        let json = {};
        json.name = userDetails.name;
        json.email = userDetails.email;
        json.mobile = userDetails.mobile;
        if(session.oauth!=null && session.provider!=null)
            json.oauth = {
                access_token: session.oauth,
                provider: session.provider
            };
        else json.psasword = userDetails.password;
        axios.post(url,json)
            .then((response) => { dispatch({ type: "SIGNUP_USER_FULFILLED", payload: response.data.jwt}); })
            .catch((error) => { dispatch({ type: "SIGNUP_USER_FAILED", payload: error }); });
    };
}
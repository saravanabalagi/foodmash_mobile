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

export function fetchUser() {
    const url = '/users/me';
    return (dispatch) => {
        dispatch({type: "FETCH_USER_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_USER_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_USER_FAILED", payload: error }); });
    };
}

export function signupUser(userDetails) {
    const url = '/users/create';
    return (dispatch) => {
        dispatch({type: "SIGNUP_USER_IN_PROGRESS"});
        let accessToken = store.getState().user.session.signup.oauth.accessToken;
        let provider = store.getState().user.session.signup.oauth.provider;
        let json = {};
        json.name = userDetails.name; json.email = userDetails.email; json.mobile = userDetails.mobile;
        if(accessToken!=null && provider!=null) { json.oauth = {access_token: accessToken, provider: provider} }
        else json.psasword = userDetails.password;
        axios.post(url,json)
            .then((response) => { dispatch({ type: "SIGNUP_USER_FULFILLED", payload: response.data.jwt}); })
            .catch((error) => { dispatch({ type: "SIGNUP_USER_FAILED", payload: error }); });
    };
}
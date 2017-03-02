import axios from 'axios';
import store from '../../store';

export function fetchJwt(credentials) {
    const url = '/auth';
    return (dispatch) => {
        if(store.getState().session.inProgress) return;
        dispatch({type: "FETCH_JWT_IN_PROGRESS"});
        axios.post(url,{ auth: {email: credentials.email, password: credentials.password}})
            .then((response) => { dispatch({ type: "FETCH_JWT_FULFILLED", payload: response.data.jwt}); })
            .catch((error) => { dispatch({ type: "FETCH_JWT_FAILED", payload: error }); });
    };
}

export function sendOauthToken(access_token, provider) {
    const url = '/auth/' + provider;
    return (dispatch) => {
        let json = { oauth: {access_token: access_token, provider: provider}};
        dispatch({type: "UPDATE_OAUTH_TOKEN_FULFILLED", access_token: access_token, provider: provider});
        dispatch({type: "OAUTH_AUTHENTICATION_IN_PROGRESS", payload: json});
        axios.post(url,json)
            .then((response) => {
                if(response.data.hasOwnProperty('jwt')) dispatch({ type: "FETCH_JWT_FULFILLED", payload: response.data.jwt});
                else if(response.data.hasOwnProperty('user')) dispatch({ type: "FETCH_OAUTH_DETAILS_FULFILLED", payload: response.data.user});
        }).catch((error) => { dispatch({ type: "FETCH_JWT_FAILED", payload: error }); });
    }
}

export function signupUser(name, email, mobile, password) {
    const url = '/users/create';
    return (dispatch) => {
        if(store.getState().session.inProgress) return;
        let session = store.getState().session;
        let json = {};
        json.name = name;
        json.email = email;
        json.mobile = mobile;
        if(session.oauthDetails!=null
            && session.oauthAccessToken!=null
            && session.oauthProvider!=null)
            json.oauth = {
                access_token: session.oauthAccessToken,
                provider: session.oauthProvider
            };
        else json.password = password;
        dispatch({type: "SIGNUP_USER_IN_PROGRESS", payload: json});
        axios.post(url,json)
            .then((response) => {
                dispatch({ type: "SIGNUP_USER_FULFILLED" });
                dispatch({ type: "FETCH_USER_FULFILLED", payload: response.data });
                if(session.oauthDetails!=null
                    && session.oauthAccessToken!=null
                    && session.oauthProvider!=null)
                    dispatch(sendOauthToken(session.oauthAccessToken, session.oauthProvider)); })
            .catch((error) => { dispatch({ type: "SIGNUP_USER_FAILED", payload: error }); });
    };
}
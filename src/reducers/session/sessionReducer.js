export default (state = {
    jwt: null,
    error: null,
    inProgress: null,
    oauthAccessToken: null,
    oauthProvider: null,
    oauthDetails: null
}, action) => {
    switch(action.type) {
        case "FETCH_JWT_IN_PROGRESS":
            return {...state,
                inProgress: true };
        case "FETCH_JWT_FULFILLED":
            return {...state,
                jwt: action.payload,
                error: null,
                inProgress: false };
        case "FETCH_JWT_FAILED":
            return {...state,
                jwt: null,
                error: action.payload,
                inProgress: false };

        case "OAUTH_AUTHENTICATION_IN_PROGRESS":
        case "SIGNUP_USER_IN_PROGRESS":
            return {...state,
                inProgress: true };
        case "SIGNUP_USER_FULFILLED":
            return {...state,
                error: null,
                inProgress: false };
        case "SIGNUP_USER_FAILED":
            return {...state,
                error: action.payload,
                inProgress: false };

        case "FETCH_OAUTH_DETAILS_FULFILLED":
            return {...state,
                oauthDetails: action.payload,
                inProgress: false,
                error: null};
        case "UPDATE_OAUTH_TOKEN_FULFILLED":
            return {...state,
                oauthAccessToken: action.access_token,
                oauthProvider: action.provider};
    }
    return state;
}
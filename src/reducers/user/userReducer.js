export default (state = {
    jwt: null,
    inProgress: false,
    name: null,
    mobile: null,
    email: null,
    error: null,
    session: {
        jwt: null,
        error: null,
        inProgress: null,
        signup: {
            oauth: {
                accessToken: null,
                provider: null
            },
            name: null,
            email: null,
            mobile: null,
            password: null,
            error: null,
            inProgress: null
        }
    }
},action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_JWT_IN_PROGRESS": newState.session.inProgress = true; break;
        case "FETCH_JWT_FULFILLED": newState.session.jwt = action.payload; newState.session.error = null; newState.session.inProgress = false; break;
        case "FETCH_JWT_FAILED": newState.session.jwt = null; newState.session.error = action.payload; newState.session.inProgress = false; break;

        case "FETCH_USER_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_USER_FULFILLED": newState.user = action.payload; newState.error = null; newState.inProgress = false; break;
        case "FETCH_USER_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "SIGNUP_USER_IN_PROGRESS": newState.session.signup.inProgress = true; break;
        case "SIGNUP_USER_FULFILLED": newState.session.signup.user = action.payload; newState.session.signup.error = null; newState.session.signup.inProgress = false; break;
        case "SIGNUP_USER_FAILED": newState.session.signup.error = action.payload; newState.session.signup.inProgress = false; break;
    }
    return newState;
};
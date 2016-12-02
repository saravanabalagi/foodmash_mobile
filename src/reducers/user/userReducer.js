export default (state = {
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
        case "FETCH_USER_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_USER_FULFILLED":
            newState.name = action.payload.name; newState.mobile = action.payload.mobile; newState.email = action.payload.email;
            newState.error = null; newState.inProgress = false; break;
        case "FETCH_USER_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    if(["FETCH_JWT_IN_PROGRESS",
            "FETCH_JWT_FULFILLED",
            "FETCH_JWT_FAILED"].includes(action.type))
        newState.session = manageJwt(newState.session,action);

    else if(["SIGNUP_USER_IN_PROGRESS",
            "SIGNUP_USER_FULFILLED",
            "SIGNUP_USER_FAILED"].includes(action.type))
        newState.session = {...newState.session, signup: manageSignup(newState.session.signup,action)};

    return newState;
};

let manageJwt = (state={}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_JWT_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_JWT_FULFILLED": newState.jwt = action.payload; newState.error = null; newState.inProgress = false; break;
        case "FETCH_JWT_FAILED": newState.jwt = null; newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
};

let manageSignup = (state={}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "SIGNUP_USER_IN_PROGRESS": newState.inProgress = true; break;
        case "SIGNUP_USER_FULFILLED": newState.user = action.payload; newState.error = null; newState.inProgress = false; break;
        case "SIGNUP_USER_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
};
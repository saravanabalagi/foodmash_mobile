export default (state = {
    jwt: null,
    error: null,
    inProgress: null,
    oauth: null,
    provider: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_JWT_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_JWT_FULFILLED": newState.jwt = action.payload; newState.error = null; newState.inProgress = false; break;
        case "FETCH_JWT_FAILED": newState.jwt = null; newState.error = action.payload; newState.inProgress = false; break;

        case "SIGNUP_USER_IN_PROGRESS": newState.inProgress = true; break;
        case "SIGNUP_USER_FULFILLED": newState.error = null; newState.inProgress = false; break;
        case "SIGNUP_USER_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
}
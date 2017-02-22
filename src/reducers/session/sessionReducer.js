export default (state = {
    jwt: null,
    error: null,
    inProgress: null,
    oauth: null,
    provider: null
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
    }
    return state;
}
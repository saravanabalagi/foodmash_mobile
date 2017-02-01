export default (state = {
    inProgress: false,
    name: null,
    mobile: null,
    email: null,
    locationId: null,
    error: null
},action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_USER_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_USER_FULFILLED":
            newState.name = action.payload.name;
            newState.mobile = action.payload.mobile;
            newState.email = action.payload.email;
            newState.locationId = action.payload.location_id;
            newState.error = null; newState.inProgress = false; break;
        case "FETCH_USER_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
};
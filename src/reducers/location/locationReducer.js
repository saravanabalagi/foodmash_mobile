export default (state = {
    locations: [],
    selected: null,
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_LOCATIONS_FULFILLED": newState.locations = action.payload; newState.error = null; break;
        case "FETCH_LOCATIONS_FAILED": newState.error = action.payload; break;
    }
    newState.inProgress = action.type === "FETCH_LOCATIONS_IN_PROGRESS";
    return newState;
}
export default (state = {
    locations: [],
    selected: null,
    siblings: [],
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_LOCATIONS_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_LOCATIONS_FULFILLED": newState.locations = action.payload; newState.error = null; newState.inProgress = false; break;
        case "FETCH_LOCATIONS_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "FETCH_SIBLINGS_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_SIBLINGS_FULFILLED": newState.siblings = action.payload; newState.error = null; newState.inProgress = false; break;
        case "FETCH_SIBLINGS_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "SELECT_LOCATION": newState.selected = action.payload;
    }
    return newState;
}
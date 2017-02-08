export default (state = {
    locations: {},
    selected: null,
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_LOCATIONS_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_LOCATIONS_FULFILLED": newState.locations = {...newState.locations, [action.payload.id]: action.payload}; newState.error = null; newState.inProgress = false; break;
        case "FETCH_LOCATIONS_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "FETCH_LOCATION_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_LOCATION_FULFILLED": newState.locations = {...newState.locations, [action.payload.id]: action.payload}; newState.error = null; newState.inProgress = false; break;
        case "FETCH_LOCATION_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "SELECT_LOCATION": newState.selected = action.payload;
    }
    return newState;
}

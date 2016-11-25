export default (state = {
    cities: [],
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_CITIES_FULFILLED": newState.cities = action.payload; newState.error = null; break;
        case "FETCH_CITIES_FAILED": newState.error = action.payload; break;
    }
    newState.inProgress = action.type === "FETCH_CITIES_IN_PROGRESS";
    return newState;
}
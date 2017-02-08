export default (state = {
    cities: {},
    selected: null,
    fetched: null,
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_CITIES_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_CITIES_FULFILLED": newState.cities = {...newState.cities, [action.payload.id]: action.payload}; newState.error = null; newState.inProgress = false; break;
        case "FETCH_CITIES_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "FETCH_CITY_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_CITY_FULFILLED": newState.cities = {...newState.cities, [action.payload.id]: action.payload}; newState.error = null; newState.inProgress = false; break;
        case "FETCH_CITY_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "SELECT_CITY": newState.selected = action.payload; break;
        case "FETCHING_LOCATIONS_FOR_CITY": newState.fetched = action.payload; break;
    }
    return newState;
}

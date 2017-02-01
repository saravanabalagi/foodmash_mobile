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
        case "FETCH_CITIES_FULFILLED": newState.cities = updateCities(newState.cities, action); newState.error = null; newState.inProgress = false; break;
        case "FETCH_CITIES_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "FETCH_CITY_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_CITY_FULFILLED": newState.cities = updateCities(newState.cities, action); newState.error = null; newState.inProgress = false; break;
        case "FETCH_CITY_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "SELECT_CITY": newState.selected = action.payload; break;
        case "FETCHING_LOCATIONS_FOR_CITY": newState.fetched = action.payload; break;
    }
    return newState;
}

function updateCities(state = {},action) {
    const newState = {...state};
    if(Array.isArray(action.payload)) action.payload.forEach(city=> newState[city.id] = city);
    else newState[action.payload.id] = action.payload;
    return newState;
}
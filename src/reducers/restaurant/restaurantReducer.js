export default (state = {
    restaurants: {},
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_RESTAURANT_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_RESTAURANT_FULFILLED": newState.restaurants = updateRestaurants(state.restaurants, action); newState.error = null; newState.inProgress = false; break;
        case "FETCH_RESTAURANT_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
}

function updateRestaurants(state = {},action) {
    const newState = {...state};
    newState[action.payload.id] = action.payload;
    return newState;
}
export default (state = {
    dishes: {},
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_DISH_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_DISH_FULFILLED": newState.dishes = updateDishes(newState.dishes, action); newState.error = null; newState.inProgress = false; break;
        case "FETCH_DISH_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
}

function updateDishes(state = {},action) {
    const newState = {...state};
    newState[action.payload.id] = action.payload;
    return newState;
}
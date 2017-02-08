export default (state = {
    dishes: {},
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_DISH_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_DISH_FULFILLED": newState.dishes = {...newState.dishes, [action.payload.id]: action.payload}; newState.error = null; newState.inProgress = false; break;
        case "FETCH_DISH_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
}

export default (state = {
    dishes: [],
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_DISH_FULFILLED": newState.dishes.push(action.payload); newState.error = null; break;
        case "FETCH_DISH_FAILED": newState.error = action.payload; break;
    }
    newState.inProgress = action.type === "FETCH_DISH_IN_PROGRESS";
    return newState;
}
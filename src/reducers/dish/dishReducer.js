export default (state = {
    dishes: [],
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_DISHES_FULFILLED": newState.dishes = action.payload; newState.error = null; break;
        case "FETCH_DISHES_FAILED": newState.error = action.payload; break;
    }
    newState.inProgress = action.type === "FETCH_DISHES_IN_PROGRESS";
    return newState;
}
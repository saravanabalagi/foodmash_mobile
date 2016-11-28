export default (state = [], action) => {
    return state.map(dish => (dish.id == action.id) ? manageDish(dish, action) : dish);
}

let manageDish = (state = {},action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_DISH_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_DISH_FULFILLED": newState.dish = action.payload; newState.error = null; newState.inProgress = false; break;
        case "FETCH_DISH_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
};
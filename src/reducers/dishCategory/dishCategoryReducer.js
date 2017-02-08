export default (state = {
    dishCategories: {},
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_DISH_CATEGORIES_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_DISH_CATEGORIES_FULFILLED": action.payload.map(dishCategory => newState.dishCategories[dishCategory.id] = dishCategory); newState.error = null; newState.inProgress = false; break;
        case "FETCH_DISH_CATEGORIES_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "FETCH_DISH_CATEGORY_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_DISH_CATEGORY_FULFILLED": newState.dishCategories = {...newState.dishCategories, [action.payload.id]: action.payload}; newState.error = null; newState.inProgress = false; break;
        case "FETCH_DISH_CATEGORY_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
}

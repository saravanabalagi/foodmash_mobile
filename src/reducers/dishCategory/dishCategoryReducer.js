export default (state = {
    dishCategories: [],
    selected: null,
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        // case "FETCH_DISHES_FOR_CATEGORY_IN_PROGRESS": newState.dishCategories.dish.inProgress = true; break;
        // case "FETCH_DISHES_FOR_CATEGORY_FULFILLED": newState.dishCategories.dish = action.payload; newState.dishCategories.dish.error = null; newState.dishCategories.dish.inProgress = false; break;
        // case "FETCH_DISHES_FOR_CATEGORY_FAILED": newState.dishCategories.dish.error = action.payload; newState.dishCategories.dish.inProgress = false; break;

        case "FETCH_DISH_CATEGORIES_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_DISH_CATEGORIES_FULFILLED":
            newState.dishCategories = action.payload; newState.error = null; newState.inProgress = false;
            if(newState.dishCategories.length > 0) newState.selected = newState.dishCategories[0].id; break;
        case "FETCH_DISH_CATEGORIES_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "SELECT_DISH_CATEGORY": newState.selected = action.payload; break;
    }
    return newState;
}
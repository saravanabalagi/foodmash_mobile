export default (state = {
    dish_categories: [],
    selected: null,
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_DISH_CATEGORIES_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_DISH_CATEGORIES_FULFILLED": newState.dish_categories = action.payload; newState.error = null; newState.inProgress = false; break;
        case "FETCH_DISH_CATEGORIES_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "SELECT_DISH_CATEGORY": newState.selected = action.payload; break;
    }
    if(action.id != null) newState.dish_categories = newState.dish_categories.map(dish_category => dish_category.id === action.id? manageDishCategory(dish_category,action) : dish_category);
    return newState;

}

let manageDishCategory = (state={}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_DISHES_FOR_CATEGORY_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_DISHES_FOR_CATEGORY_FULFILLED": newState.dishes = action.payload; newState.error = null; newState.inProgress = false; break;
        case "FETCH_DISHES_FOR_CATEGORY_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    if(action.dish_id != null) { newState.dishes = newState.dishes.map(dish => dish.id === action.dish_id? manageDish(dish,action) : dish  ); }
    return newState;
};

let manageDish = (state = {},action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_DISH_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_DISH_FULFILLED": const brandNewState = action.payload; brandNewState.error = null; brandNewState.inProgress = false; return brandNewState;
        case "FETCH_DISH_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
};
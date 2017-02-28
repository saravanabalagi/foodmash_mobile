export default (state = {
    dishCategories: {},
    inProgress: [],
    error: {}
}, action) => {
    switch(action.type) {
        case "FETCH_DISH_CATEGORY_IN_PROGRESS":
            return {...state,
                inProgress: [...state.inProgress, action.id]};
        case "FETCH_DISH_CATEGORY_FULFILLED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                dishCategories: {...state.dishCategories, [action.payload.id]: action.payload},
                error: {...state.error, [action.payload.id]: null}};
        case "FETCH_DISH_CATEGORIES_FULFILLED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                error: {...state.error, [action.id]: null}};
        case "FETCH_DISH_CATEGORY_FAILED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                error: {...state.error, [action.id]: action.payload}};
        case "DROP_DISH_CATEGORIES":
            return {...state,
                error: {},
                inProgress: [],
                dishCategories: {}};
    }
    return state;
}
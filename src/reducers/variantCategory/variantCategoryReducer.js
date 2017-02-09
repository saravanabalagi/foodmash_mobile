export default (state = {
    variantCategories: {},
    inProgress: [],
    error: {}
}, action) => {
    switch(action.type) {
        case "FETCH_VARIANT_CATEGORY_IN_PROGRESS":
            return {...state,
                inProgress: [...state.inProgress, action.id]};
        case "FETCH_VARIANT_CATEGORY_FULFILLED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                variantCategories: {...state.variantCategories, [action.payload.id]: action.payload},
                error: {...state.error, [action.payload.id]: null}};
        case "FETCH_VARIANT_CATEGORY_FAILED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                error: {...state.error, [action.id]: action.payload}};
    }
    return state;
}
export default (state = {
    variantCategories: {},
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_VARIANT_CATEGORY_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_VARIANT_CATEGORY_FULFILLED": newState.variantCategories = {...newState.variantCategories, [action.payload.id]: action.payload}; newState.error = null; newState.inProgress = false; break;
        case "FETCH_VARIANT_CATEGORY_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
}

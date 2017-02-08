export default (state = {
    variants: {},
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_VARIANT_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_VARIANT_FULFILLED": newState.variants = {...newState.variants, [action.payload.id]: action.payload}; newState.error = null; newState.inProgress = false; break;
        case "FETCH_VARIANT_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
}

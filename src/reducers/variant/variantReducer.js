export default (state = {
    variants: {},
    inProgress: [],
    error: {}
}, action) => {
    switch(action.type) {
        case "FETCH_VARIANT_IN_PROGRESS":
            return {...state,
                inProgress: [...state.inProgress, action.id]};
        case "FETCH_VARIANT_FULFILLED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                variants: {...state.variants, [action.payload.id]: action.payload},
                error: {...state.error, [action.payload.id]: null}};
        case "FETCH_VARIANT_FAILED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                error: {...state.error, [action.id]: action.payload}};
    }
    return state;
}
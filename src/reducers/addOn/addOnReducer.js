export default (state = {
    addOns: {},
    inProgress: [],
    error: {}
}, action) => {
    switch(action.type) {
        case "FETCH_ADD_ON_IN_PROGRESS":
            return {...state,
                inProgress: [...state.inProgress, action.id]};
        case "FETCH_ADD_ON_FULFILLED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                addOns: {...state.addOns, [action.payload.id]: action.payload},
                error: {...state.error, [action.payload.id]: null}};
        case "FETCH_ADD_ON_FAILED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                error: {...state.error, [action.id]: action.payload}};
    }
    return state;
}

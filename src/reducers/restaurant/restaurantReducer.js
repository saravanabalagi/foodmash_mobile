export default (state = {
    restaurants: {},
    inProgress: [],
    error: {}
}, action) => {
    switch(action.type) {
        case "FETCH_RESTAURANT_IN_PROGRESS":
            return {...state,
                inProgress: [...state.inProgress, action.id]};
        case "FETCH_RESTAURANT_FULFILLED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                restaurants: {...state.restaurants, [action.payload.id]: action.payload},
                error: {...state.error, [action.payload.id]: null}};
        case "FETCH_RESTAURANT_FAILED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                error: {...state.error, [action.id]: action.payload}};
    }
    return state;
}
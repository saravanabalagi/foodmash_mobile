export default (state = {
    locations: {},
    inProgress: [],
    error: {}
}, action) => {
    switch(action.type) {
        case "FETCH_LOCATION_IN_PROGRESS":
            return {...state,
                inProgress: [...state.inProgress, action.id]};
        case "FETCH_LOCATION_FULFILLED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                locations: {...state.locations, [action.payload.id]: action.payload},
                error: {...state.error, [action.payload.id]: null}};
        case "FETCH_LOCATIONS_FULFILLED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                error: {...state.error, [action.id]: null}};
        case "FETCH_LOCATION_FAILED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                error: {...state.error, [action.id]: action.payload}};
    }
    return state;
}

export default (state = {
    cities: {},
    inProgress: [],
    error: {}
}, action) => {
    switch(action.type) {
        case "FETCH_CITY_IN_PROGRESS":
            return {...state,
                inProgress: [...state.inProgress, action.id]};
        case "FETCH_CITY_FULFILLED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                cities: {...state.cities, [action.payload.id]: action.payload},
                error: {...state.error, [action.payload.id]: null}};
        case "FETCH_CITIES_FULFILLED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                error: {...state.error, [action.id]: null}};
        case "FETCH_CITY_FAILED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                error: {...state.error, [action.id]: action.payload}};
    }
    return state;
}

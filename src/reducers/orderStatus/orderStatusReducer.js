export default (state = {
    orderStatuses: {},
    inProgress: [],
    error: {}
}, action) => {
    switch(action.type) {
        case "FETCH_ORDER_STATUS_IN_PROGRESS":
            return {...state,
                inProgress: [...state.inProgress, action.id]};
        case "FETCH_ORDER_STATUS_FULFILLED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                orderStatuses: {...state.orderStatuses, [action.payload.id]: action.payload},
                error: {...state.error, [action.payload.id]: null}};
        case "FETCH_ORDER_STATUS_FAILED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                error: {...state.error, [action.id]: action.payload}};
    }
    return state;
}

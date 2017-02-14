export default (state = {
    paymentMethods: {},
    inProgress: [],
    error: {}
}, action) => {
    switch(action.type) {
        case "FETCH_PAYMENT_METHOD_IN_PROGRESS":
            return {...state,
                inProgress: [...state.inProgress, action.id]};
        case "FETCH_PAYMENT_METHOD_FULFILLED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                paymentMethods: {...state.paymentMethods, [action.payload.id]: action.payload},
                error: {...state.error, [action.payload.id]: null}};
        case "FETCH_PAYMENT_METHOD_FAILED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                error: {...state.error, [action.id]: action.payload}};
    }
    return state;
}

export default (state = {
    restaurantOrders: {},
    inProgress: [],
    error: {}
}, action) => {
    switch(action.type) {
        case "FETCH_RESTAURANT_ORDER_IN_PROGRESS":
            return {...state,
                inProgress: [...state.inProgress, action.id]};
        case "FETCH_RESTAURANT_ORDER_FULFILLED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                restaurantOrders: {...state.restaurantOrders, [action.payload.id]: action.payload},
                error: {...state.error, [action.payload.id]: null}};
        case "FETCH_RESTAURANT_ORDERS_FULFILLED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                error: {...state.error, [action.id]: null}};
        case "FETCH_RESTAURANT_ORDER_FAILED":
            return {...state,
                inProgress: state.inProgress.filter(id => id!=action.id),
                error: {...state.error, [action.id]: action.payload}};
    }
    return state;
}
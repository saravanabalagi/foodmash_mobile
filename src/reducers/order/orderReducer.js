export default (state = {
    orders: [],
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_ORDERS_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_ORDERS_FULFILLED": newState.orders = action.payload; newState.error = null; newState.inProgress = false; break;
        case "FETCH_ORDERS_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    if(action.id != null) newState.orders = newState.orders.map(order => order.id === action.id? manageOrder(order,action): order);
    return newState;
}

let manageOrder = (state={}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_ORDER_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_ORDER_FULFILLED": const brandNewState = action.payload; brandNewState.error = null; brandNewState.inProgress = false; return brandNewState;
        case "FETCH_ORDER_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState
};
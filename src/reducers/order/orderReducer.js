export default (state = {
    orders: [],
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_ORDERS_FULFILLED": newState.orders = action.payload; newState.error = null; break;
        case "FETCH_ORDERS_FAILED": newState.error = action.payload; break;
    }
    newState.inProgress = action.type === "FETCH_ORDERS_IN_PROGRESS";
    return newState;
}
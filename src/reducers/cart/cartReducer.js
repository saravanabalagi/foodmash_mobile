export default (state = {
    cart: {},
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_CART_FULFILLED": newState.cart = action.payload; newState.error = null; break;
        case "FETCH_CART_FAILED": newState.error = action.payload; break;
    }
    newState.inProgress = action.type === "FETCH_CART_IN_PROGRESS";
    return newState;
}
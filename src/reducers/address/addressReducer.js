export default (state = {
    addresses: [],
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_ADDRESSES_FULFILLED": newState.addresses = action.payload; newState.error = null; break;
        case "FETCH_ADDRESSES_FAILED": newState.error = action.payload; break;
    }
    newState.inProgress = action.type === "FETCH_ADDRESSES_IN_PROGRESS";
    return newState;
}
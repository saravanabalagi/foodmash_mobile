export default (state = {
    addresses: [],
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_ADDRESSES_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_ADDRESSES_FULFILLED": newState.addresses = action.payload; newState.error = null; newState.inProgress = false; break;
        case "FETCH_ADDRESSES_FAILED": newState.addresses = []; newState.error = action.payload; newState.inProgress = false; break;

        case "ADD_ADDRESS_IN_PROGRESS": newState.inProgress = true; break;
        case "ADD_ADDRESS_FULFILLED": newState.error = null; newState.inProgress = false; break;
        case "ADD_ADDRESS_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "UPDATE_ADDRESS_IN_PROGRESS": newState.inProgress = true; break;
        case "UPDATE_ADDRESS_FULFILLED": newState.error = null; newState.inProgress = false; break;
        case "UPDATE_ADDRESS_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "DELETE_ADDRESS_IN_PROGRESS": newState.inProgress = true; break;
        case "DELETE_ADDRESS_FULFILLED": newState.error = null; newState.inProgress = false; break;
        case "DELETE_ADDRESS_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
}
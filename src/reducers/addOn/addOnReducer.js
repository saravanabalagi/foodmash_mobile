export default (state = {
    addOns: {},
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_ADD_ON_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_ADD_ON_FULFILLED": newState.addOns = updateAddOns(state.addOns, action); newState.error = null; newState.inProgress = false; break;
        case "FETCH_ADD_ON_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
}

function updateAddOns(state = {},action) {
    const newState = {...state};
    newState[action.payload.id] = action.payload;
    return newState;
}
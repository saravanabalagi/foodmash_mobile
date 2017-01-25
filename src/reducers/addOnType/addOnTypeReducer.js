export default (state = {
    addOnTypes: {},
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_ADD_ON_TYPE_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_ADD_ON_TYPE_FULFILLED": newState.addOnTypes = updateAddOnTypes(state.addOnTypes, action); newState.error = null; newState.inProgress = false; break;
        case "FETCH_ADD_ON_TYPE_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
}

function updateAddOnTypes(state = {},action) {
    const newState = {...state};
    newState[action.payload.id] = action.payload;
    return newState;
}
export default (state = {
    addOnTypeLinks: {},
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_ADD_ON_TYPE_LINK_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_ADD_ON_TYPE_LINK_FULFILLED": newState.addOnTypeLinks = updateAddOnTypeLinks(state.addOnTypeLinks, action); newState.error = null; newState.inProgress = false; break;
        case "FETCH_ADD_ON_TYPE_LINK_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
}

function updateAddOnTypeLinks(state = {},action) {
    const newState = {...state};
    newState[action.payload.id] = action.payload;
    return newState;
}
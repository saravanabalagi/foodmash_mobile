export default (state = {
    addOnLinks: {},
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_ADD_ON_LINK_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_ADD_ON_LINK_FULFILLED": newState.addOnLinks = {...newState.addOnLinks, [action.payload.id]: action.payload}; newState.error = null; newState.inProgress = false; break;
        case "FETCH_ADD_ON_LINK_FAILED": newState.error = action.payload; newState.inProgress = false; break;
    }
    return newState;
}

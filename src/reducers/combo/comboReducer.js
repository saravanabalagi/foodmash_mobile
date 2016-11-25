export default (state = {
    combos: [],
    inProgress: false,
    error: null
}, action) => {
    const newState = {...state};
    switch(action.type) {
        case "FETCH_COMBOS_FULFILLED": newState.combos = action.payload; newState.error = null; break;
        case "FETCH_COMBOS_FAILED": newState.error = action.payload; break;
    }
    newState.inProgress = action.type === "FETCH_COMBOS_IN_PROGRESS";
    return newState;
}
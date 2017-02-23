export default (state = {
    inProgress: false,
    name: null,
    email: null,
    mobile: null,
    roles: [],
    location_id: null,
    error: null
},action) => {
    switch(action.type) {
        case "FETCH_USER_IN_PROGRESS":
            return {...state,
                inProgress: true};
        case "FETCH_USER_FULFILLED":
            return {...state,
                name: action.payload.hasOwnProperty('name')?action.payload.name:null,
                email: action.payload.hasOwnProperty('email')?action.payload.email:null,
                mobile: action.payload.hasOwnProperty('mobile')?action.payload.mobile:null,
                location_id: action.payload.hasOwnProperty('location_id')?action.payload.location_id:null,
                roles: action.payload.hasOwnProperty('roles')?action.payload.roles:[],
                inProgress: false,
                error: null};
        case "FETCH_USER_FAILED":
            return {...state,
                error: action.payload,
                inProgress: false};
        case "SELECT_LOCATION_FULFILLED":
            return {...state,
                location_id: action.id};
        case "SELECT_LOCATION_FAILED":
            return {...state,
                error: action.payload};
    }
    return state;
};
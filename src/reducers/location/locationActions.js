import axios from 'axios';
import store from '../../store';

export function fetchLocations(city_id) {
    const url = '/cities/' + city_id.toString() + '/locations';
    return (dispatch) => {
        if(store.getState().location.inProgress.includes(0)) return;
        dispatch({type: "FETCH_LOCATION_IN_PROGRESS", id: 0});
        axios.get(url)
            .then((response) => {
                dispatch({type: "FETCH_LOCATIONS_FULFILLED", id: 0});
                response.data.forEach(location => dispatch({type: "FETCH_LOCATION_FULFILLED", payload: location, id: location.id})); })
            .catch((error) => { dispatch({ type: "FETCH_LOCATION_FAILED", payload: error, id: 0}); });
    };
}

export function fetchLocation(id) {
    const url = '/locations/' + id.toString();
    return (dispatch) => {
        if(store.getState().location.locations[id] != null
            || store.getState().location.inProgress.includes(id)) return;
        dispatch({type: "FETCH_LOCATION_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_LOCATION_FULFILLED", payload: response.data, id: id }); })
            .catch((error) => { dispatch({ type: "FETCH_LOCATION_FAILED", payload: error, id: id }); });
    };
}

export function selectLocation(id) {
    const url = '/users/me/location';
    return (dispatch) => {
        axios.post(url,{location:{id: id}})
            .then((response) => { dispatch({ type: "SELECT_LOCATION_FULFILLED", payload: response.data, id: id }); })
            .catch((error) => { dispatch({ type: "SELECT_LOCATION_FAILED", payload: error, id: id }); });
    }
}
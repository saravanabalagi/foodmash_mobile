import axios from 'axios';
import {Actions} from 'react-native-router-flux';

export function fetchLocations(city_id) {
    const url = '/cities/' + city_id.toString() + '/locations';
    return (dispatch) => {
        dispatch({type: "FETCH_LOCATIONS_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_LOCATIONS_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_LOCATIONS_FAILED", payload: error }); });
    };
}

export function fetchSiblings(location_id) {
    const url = '/locations/' + location_id.toString() + '/siblings';
    return (dispatch) => {
        dispatch({type: "FETCH_SIBLINGS_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_SIBLINGS_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_SIBLINGS_FAILED", payload: error }); });
    };
}

export function selectLocation(location_id, city_id) {
    return (dispatch) => {
        dispatch({type: "SELECT_LOCATION", payload: location_id}) ;
        dispatch({type: "SELECT_CITY", payload: city_id});
        dispatch(fetchSiblings(location_id));
        Actions.app();
    }
}
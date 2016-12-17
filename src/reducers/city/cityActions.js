import axios from 'axios';
import {fetchLocations} from '../location/locationActions';

export function fetchCities() {
    const url = '/cities';
    return (dispatch) => {
        dispatch({type: "FETCH_CITIES_IN_PROGRESS"});
        axios.get(url)
            .then((response) => {
                dispatch({ type: "FETCH_CITIES_FULFILLED", payload: response.data});
                if (response.data.length > 0) dispatch(selectCityAndFetchLocations(response.data[0].id));
            })
            .catch((error) => { dispatch({ type: "FETCH_CITIES_FAILED", payload: error }); });
    };
}

export function selectCityAndFetchLocations(city_id) {
    const url = '/cities/' + city_id.toString();
    return (dispatch) => {
        dispatch({type: "FETCHING_LOCATIONS_FOR_CITY", payload: city_id});
        dispatch(fetchLocations(city_id));
    }
}
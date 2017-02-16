import axios from 'axios';
import store from '../../store';

export function fetchCities() {
    const url = '/cities';
    return (dispatch) => {
        if(store.getState().city.inProgress.includes(0)) return;
        dispatch({type: "FETCH_CITY_IN_PROGRESS", id: 0});
        axios.get(url)
            .then((response) => {
                dispatch({type: "FETCH_CITIES_FULFILLED", id: 0});
                response.data.forEach(city => dispatch({type: "FETCH_CITY_FULFILLED", payload: city, id: city.id})); })
            .catch((error) => { dispatch({ type: "FETCH_CITY_FAILED", payload: error, id: 0}); });
    };
}

export function fetchCity(id) {
    const url = '/cities/' + id.toString();
    return (dispatch) => {
        if(store.getState().city.cities[id] != null
            || store.getState().city.inProgress.includes(id)) return;
        dispatch({type: "FETCH_CITY_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_CITY_FULFILLED", payload: response.data, id: id }); })
            .catch((error) => { dispatch({ type: "FETCH_CITY_FAILED", payload: error, id: id }); });
    };
}
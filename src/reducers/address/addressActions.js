import axios from 'axios';
import {Actions} from 'react-native-router-flux';

export function fetchAddresses() {
    const url = '/addresses';
    return (dispatch) => {
        dispatch({type: "FETCH_ADDRESSES_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_ADDRESSES_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_ADDRESSES_FAILED", payload: error }); });
    };
}

export function addAddress(address) {
    const url = '/addresses';
    return (dispatch) => {
        dispatch({type: "ADD_ADDRESS_IN_PROGRESS"});
        axios.post(url, address)
            .then((response) => { dispatch({ type: "ADD_ADDRESS_FULFILLED", payload: response.data}); dispatch(fetchAddresses()); Actions.pop(); })
            .catch((error) => { dispatch({ type: "ADD_ADDRESS_FAILED", payload: error }); });
    };
}

export function updateAddress(address) {
    const url = '/addresses/' + address.address.id;
    return (dispatch) => {
        dispatch({type: "UPDATE_ADDRESS_IN_PROGRESS"});
        axios.patch(url, address)
            .then((response) => { dispatch({ type: "UPDATE_ADDRESS_FULFILLED", payload: response.data}); dispatch(fetchAddresses()); Actions.pop(); })
            .catch((error) => { dispatch({ type: "UPDATE_ADDRESS_FAILED", payload: error }); });
    };
}

export function deleteAddress(address_id) {
    const url = '/addresses/' + address_id.toString();
    return (dispatch) => {
        dispatch({type: "DELETE_ADDRESS_IN_PROGRESS"});
        axios.delete(url)
            .then((response) => { dispatch({ type: "DELETE_ADDRESS_FULFILLED", payload: response.data}); dispatch(fetchAddresses()); })
            .catch((error) => { dispatch({ type: "DELETE_ADDRESS_FAILED", payload: error }); });
    };
}
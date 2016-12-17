import axios from 'axios';
import store from '../store';

export function setAxiosDefaults() {
    axios.defaults.baseURL = "http://localhost:8000";
    axios.defaults.headers.common['Content-Type'] = "application/json";
    axios.interceptors.request.use((config) => {
        let token = store.getState().user.session.jwt;
        let selectedLocation = store.getState().location.selected;
        if(token!=null) {
            console.log('attaching jwt header');
            config.headers.Authorization = 'Bearer ' + token;
        }
        if(selectedLocation!=null) {
            console.log('attaching location');
            config.headers['Location'] = selectedLocation.toString();
        }
        return config;
    });
}
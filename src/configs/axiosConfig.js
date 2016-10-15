import axios from 'axios';
import store from '../store';

export function setAxiosDefaults() {
    axios.defaults.baseURL = "http://10.0.3.2:8000";
    axios.defaults.headers.common['Content-Type'] = "application/json";
    axios.interceptors.request.use((config) => {
        var token = store.getState().user.jwt;
        if(token!=null) {
            console.log('attaching jwt header');
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    });
}
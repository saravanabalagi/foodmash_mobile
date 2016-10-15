import React from 'react'
import { Component } from 'react-native';
import { Provider } from 'react-redux';

import App from './containers/App'
import store from './store';

//Execute root file inside configs
import { setDefaults } from './configs/config.js';
setDefaults();

const Main = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
};

export default Main

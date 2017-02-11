import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

import {Scene, Router, Actions, ActionConst, Reducer} from 'react-native-router-flux';
import Account from './Account';
import Cart from './Cart';
import Checkout from './Checkout';
import LoginForm from '../containers/LoginForm';
import TabIcon from '../views/TabIcon';
import DishCategoryList from '../containers/DishCategoryList';

const reducerCreate = (params) => {
    const defaultReducer = Reducer(params);
    return (state, action)=> {
        console.log("ACTION:", action);
        console.log("STATE:", state);
        return defaultReducer(state, action);
    }
};

export default class App extends Component {

    render() {
        return (
            <Router createReducer={reducerCreate}>
                <Scene hideNavBar={true}
                       component={LoginForm}
                       key="login"/>
                <Scene key="app" tabs={true} tabBarStyle={s.mainTabs}>
                    <Scene title="Menu"
                           icon={TabIcon}
                           tabIcon="restaurant-menu"
                           key="menu"
                           hideNavBar={true}>
                        <Scene title="Menu"
                               component={DishCategoryList}
                               key="dishCategory"
                               hideNavBar={true}/>
                    </Scene>
                    <Scene title="Cart"
                           icon={TabIcon}
                           tabIcon="shopping-cart"
                           hideNavBar={true}
                           key="cart">
                        <Scene title="In Cart"
                               component={Cart}
                               key="inCart"/>
                        <Scene title="Checkout"
                               component={Checkout}
                               hideTabBar={true}
                               key="checkout"/>
                    </Scene>
                    <Scene title="Account"
                           icon={TabIcon}
                           tabIcon="account-circle"
                           hideNavBar={true}
                           key="account">
                        <Scene title="Profile"
                               component={Account}
                               key="profile"/>
                    </Scene>
                </Scene>
            </Router>
        );
    }
}

const s = StyleSheet.create({
    mainTabs: {
        backgroundColor: '#EEE',
        height: 80
    }
});
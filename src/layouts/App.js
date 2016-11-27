import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

import {Scene, Router, Actions, ActionConst, Reducer} from 'react-native-router-flux';
import Login from './Login';
import Cart from './Cart';
import Orders from './ViewOrders';
import TabIcon from '../views/TabIcon';
import NavBarIcon from '../views/NavBarIcon';
import DishCategoryList from '../containers/DishCategoryList';
import ComboList from '../containers/ComboList';

const reducerCreate = (params) => {
    const defaultReducer = Reducer(params);
    return (state, action)=> {
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

export default class App extends Component {

    render() {
        return (
            <Router createReducer={reducerCreate}>
                <Scene key="root" tabs={true} tabBarStyle={s.mainTabs}>
                    <Scene title="Mash"
                           component={DishCategoryList}
                           icon={TabIcon}
                           tabIcon="cutlery"
                           key="foodmash"
                           hideNavBar={true}
                           initial={true}/>
                    <Scene title="Cart"
                           renderRightButton={()=>{ return <NavBarIcon navIcon="md-trash"/> }}
                           component={ComboList}
                           icon={TabIcon}
                           tabIcon="shopping-cart"
                           hideNavBar={true}
                           key="cart"/>
                    <Scene title="Orders"
                           component={Orders}
                           icon={TabIcon}
                           tabIcon="truck"
                           hideNavBar={true}
                           key="orders"/>
                    <Scene title="Account"
                           component={Login}
                           icon={TabIcon}
                           tabIcon="user"
                           hideNavBar={true}
                           key="account"/>
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
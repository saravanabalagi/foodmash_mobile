import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

import {Scene, Router, Actions, ActionConst, Reducer} from 'react-native-router-flux';
import SelectLocation from './SelectLocation';
import ViewAccount from './ViewAccount';
import Cart from './Cart';
import Checkout from './Checkout';
import ViewDish from './ViewDish';
import ViewOrders from './ViewOrders';
import ViewOrderDetails from './ViewOrderDetails';
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
                       component={SelectLocation}
                       key="location"/>
                <Scene key="app" tabs={true} tabBarStyle={s.mainTabs}>
                    <Scene title="Mash"
                           icon={TabIcon}
                           tabIcon="cutlery"
                           key="mash"
                           hideNavBar={true}>
                        <Scene title="Mash"
                               component={DishCategoryList}
                               key="dishCategory"
                               hideNavBar={true}/>
                        <Scene title="Mash"
                               component={ViewDish}
                               key="viewDish"
                               hideTabBar={true}
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
                    <Scene title="Orders"
                           icon={TabIcon}
                           tabIcon="truck"
                           type={ActionConst.REFRESH}
                           hideNavBar={true}
                           key="orders" >
                        <Scene title="Orders"
                               component={ViewOrders}
                               key="orderList"/>
                        <Scene title="Order Details"
                               component={ViewOrderDetails}
                               hideTabBar={true}
                               key="viewOrderDetails"/>
                    </Scene>
                    <Scene title="Account"
                           icon={TabIcon}
                           tabIcon="user"
                           hideNavBar={true}
                           key="account">
                        <Scene title="Profile"
                               component={ViewAccount}
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
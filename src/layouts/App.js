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
import ViewDish from './ViewDish';
import ViewOrders from './ViewOrders';
import ViewOrderDetails from './ViewOrderDetails';
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
                           icon={TabIcon}
                           tabIcon="cutlery"
                           key="mash"
                           hideNavBar={true}
                           initial={true}>
                        <Scene title="Mash"
                               component={DishCategoryList}
                               key="dishCategory"
                               hideNavBar={true}
                               initial={true}/>
                        <Scene title="Mash"
                               component={ViewDish}
                               key="viewDish"
                               hideTabBar={true}
                               hideNavBar={true}/>
                    </Scene>
                    <Scene title="Cart"
                           renderRightButton={()=>{ return <NavBarIcon navIcon="md-trash"/> }}
                           component={ComboList}
                           icon={TabIcon}
                           tabIcon="shopping-cart"
                           hideNavBar={true}
                           key="cart"/>
                    <Scene title="Orders"
                           icon={TabIcon}
                           tabIcon="truck"
                           type={ActionConst.REFRESH}
                           hideNavBar={true}
                           key="orders" >
                        <Scene title="Orders1"
                               component={ViewOrders}
                               key="orderList"/>
                        <Scene title="Orders2"
                               component={ViewOrderDetails}
                               hideTabBar={true}
                               key="viewOrderDetails"/>
                    </Scene>
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
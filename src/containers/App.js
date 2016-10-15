import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

import {Scene, Router, Actions, Reducer} from 'react-native-router-flux';
import Login from './Login';
import Cart from './Cart';
import Orders from './Orders';

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

const reducerCreate = (params) =>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

export default class App extends Component {

    render() {
        return (
            <Router createReducer={reducerCreate}>
                <Scene key="root">
                    <Scene key="login" component={Login} icon={TabIcon} title="Login" />
                    <Scene
                        onRight={()=>Actions.login} rightTitle="Login"
                        key="cart" component={Cart} icon={TabIcon} title="Cart" initial={true} />
                    <Scene key="orders" component={Orders} icon={TabIcon} title="Orders" />
                </Scene>
            </Router>
        );
    }
}
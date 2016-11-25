import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import OrderList from '../containers/OrderList';
import {Actions} from 'react-native-router-flux';

export default class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={{paddingTop: 50}}>
                <OrderList/>
            </View>
        );
    }

}

// const s = StyleSheet.create({
//
// });
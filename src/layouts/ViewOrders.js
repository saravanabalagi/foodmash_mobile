import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
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

                <TouchableHighlight
                    onPress={Actions.orderList}
                    style={{padding:10, backgroundColor: '#f77', margin: 10}}>
                    <Text>OrdersList</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={Actions.viewOrderDetails}
                    style={{padding:10, backgroundColor: '#7f7', margin: 10}}>
                    <Text>ViewOrderDetails</Text>
                </TouchableHighlight>
            </View>
        );
    }

}

// const s = StyleSheet.create({
//
// });
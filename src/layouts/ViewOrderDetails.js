import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {fetchOrder} from '../reducers/order/orderActions';

@connect((store) => {
    return {
        orders: store.order.orders
    }
})

export default class ViewOrderDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = () => { if(this.getOrder() && !this.getOrder().hasOwnProperty('sub_total')) this.props.dispatch(fetchOrder(this.props.id)); };
    getOrder() { return this.props.orders.filter(order => order.id === this.props.id)[0]; }

    render() {
        return (
            <View style={s.parent}>
                <Text> Order id: {this.props.id} </Text>
                <TouchableHighlight
                    onPress={Actions.pop}
                    style={{padding:10, backgroundColor: '#f77', margin: 10}}>
                    <Text>OrdersList</Text>
                </TouchableHighlight>
                { this.getOrder() && this.getOrder().inProgress && <Text> inProgress </Text> }
                { this.getOrder() && <Text> {this.getOrder().sub_total} </Text> }
                { this.getOrder() && <Text> {this.getOrder().delivery} </Text> }
                { this.getOrder() && <Text> {this.getOrder().vat} </Text> }
                { this.getOrder() && this.getOrder().hasOwnProperty('address') && Object.keys(this.getOrder().address).forEach(key => {
                    console.log(key+" "+this.getOrder().address[key]);
                    return (
                        <Text> { this.getOrder().address[key]} </Text>
                    )
                }) }
                { this.getOrder() && this.getOrder().error != null && !this.getOrder().inProgress && <Text> {this.getOrder().error.toString()} </Text> }
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {

    }
});
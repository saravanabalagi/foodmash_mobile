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
                { this.getOrder() && this.getOrder().inProgress && <Text> inProgress </Text> }
                { this.getOrder() && <Text> Sub Total: {this.getOrder().sub_total} </Text> }
                { this.getOrder() && <Text> Aggregation Charges: {this.getOrder().delivery} </Text> }
                { this.getOrder() && <Text> VAT: {this.getOrder().vat} </Text> }
                { this.getOrder() && <Text> Total: {this.getOrder().total} </Text> }
                { this.getOrder() && this.getOrder().hasOwnProperty('address') &&
                    <View style={s.address}>
                        <Text> Name: { this.getOrder().address.name } </Text>
                        <Text> Line 1: { this.getOrder().address.line1 } </Text>
                        <Text> Line 2: { this.getOrder().address.line2 } </Text>
                        <Text> Location: { this.getOrder().address.location.name }, { this.getOrder().address.location.city.name }</Text>
                        <Text> Mobile: { this.getOrder().address.mobile } </Text>
                    </View>
                }
                { this.getOrder() && this.getOrder().error != null && !this.getOrder().inProgress && <Text> {this.getOrder().error.toString()} </Text> }
                <TouchableHighlight
                    onPress={Actions.pop}
                    style={{padding:10, backgroundColor: '#f77', marginTop: 10}}>
                    <Text>Back</Text>
                </TouchableHighlight>
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        padding: 30
    },
    address: {
        backgroundColor: '#CCC',
        padding: 10,
        marginTop: 10
    }
});
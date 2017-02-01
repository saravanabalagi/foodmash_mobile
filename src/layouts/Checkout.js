import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {purchaseCart} from '../reducers/cart/cartActions'

@connect((store) => {
    return {
        dishVariants: store.cart.dishVariants,
        values: store.cart.values
    }
})

export default class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    countItems = () => { return this.props.dishVariants.reduce((sum, dish_variant)=>{ return sum + dish_variant.quantity},0); };

    render() {
        return (
            <View style={s.parent}>
                <Text>No. of items: { this.countItems() } </Text>
                <Text>Subtotal: { this.props.values.sub_total } </Text>
                <Text>Aggregation Charges: { this.props.values.delivery } </Text>
                <Text>VAT: { this.props.values.vat } </Text>
                <Text>Total: { this.props.values.total } </Text>
                <Text>Mode of Payment: Cash on Delivery </Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight
                        style={s.button}
                        onPress={Actions.pop}>
                        <Text>Cancel</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={s.button}
                        onPress={()=> this.props.dispatch(purchaseCart())}>
                        <Text>Pay now</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        flex: 1,
        padding: 30
    },
    button: {
        flex: 1,
        padding: 10,
        backgroundColor: '#C88',
        margin: 10
    }
});
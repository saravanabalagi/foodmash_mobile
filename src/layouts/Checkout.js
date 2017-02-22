import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {purchaseCart, getTotalItems} from '../reducers/cart/cartActions'

import Loading from '../views/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

@connect((store) => {
    return {
        values: store.cart.values,
        inProgress: store.cart.inProgress
    }
})

export default class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={s.parent}>
                <View style={s.titleBar}>
                    <TouchableOpacity onPress={Actions.pop}><Icon style={s.backIcon} name={"angle-left"} size={25} color={"#000a74"}/></TouchableOpacity>
                    <View style={s.titleWrapper}>
                        <MaterialIcon style={s.checkoutIcon} name={"verified-user"} size={20} color={"#e16800"}/>
                        <Text style={s.title}>Checkout</Text>
                    </View>
                    <View style={{width:60}}/>
                </View>
                { this.props.inProgress && <Loading/> }
                <Text>No. of items: { getTotalItems() || 0 } </Text>
                <Text>Subtotal: { this.props.values.sub_total } </Text>
                <Text>Aggregation Charges: { this.props.values.delivery } </Text>
                <Text>VAT: { this.props.values.vat } </Text>
                <Text>Total: { this.props.values.total } </Text>
                <Text>Mode of Payment: Cash on Delivery </Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        style={s.button}
                        onPress={()=> this.props.dispatch(purchaseCart())}>
                        <Text>Pay now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        flex: 1
    },
    button: {
        flex: 1,
        padding: 10,
        backgroundColor: '#C88',
        margin: 10
    },
    titleBar: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EEE',
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: { fontSize: 20 },
    checkoutIcon: { marginRight:5 },
    backIcon: { padding: 20 },
});
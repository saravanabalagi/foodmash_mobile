import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fetchPaymentMethod} from '../reducers/paymentMethod/paymentMethodActions';
import {fetchOrderStatus} from '../reducers/orderStatus/orderStatusActions';

@connect((store,props) => {
    return {
        orderStatus: store.orderStatus.orderStatuses[props.order.order_status_id],
        paymentMethod: store.paymentMethod.paymentMethods[props.order.payment_method_id]
    };
})


class Order extends React.Component {

    constructor(props) {
        super(props);
    }

    getIconForStatus = (status) => {
        switch (status) {
            case "Processing": return "spinner";
            case "Ready": return "bell";
            case "Purchased": return "inr";
            case "Completed": return "check";
            case "Cancelled": return "times";
        }
        return "question-circle";
    };

    componentWillMount = () => {
        this.props.dispatch(fetchOrderStatus(this.props.order.order_status_id));
        this.props.dispatch(fetchPaymentMethod(this.props.order.payment_method_id));
    };

    render() {
        return (
            <View style={s.parent}>
                <TouchableOpacity onPress={this.props.select}>
                    <View style={s.shortView}>
                        <View style={s.leftPane}>
                            <View style={s.icon}><Icon name={this.getIconForStatus(this.props.orderStatus?this.props.orderStatus.name:"")} size={15} color={"#007402"}/></View>
                            <Text style={s.date}>{ new Date(this.props.order.ordered_at).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) }</Text>
                            <Text style={s.time}>({ new Date(this.props.order.ordered_at).toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit', hour12: true }) })</Text>
                        </View>
                        <View style={s.rightPane}>
                            <Text>{ this.props.order.order_items.length } {this.props.order.order_items.length>1?"items":"item"}   | </Text>
                            <Text style={s.shortViewPrice}>₹ { parseFloat(this.props.order.total).toFixed(2) }</Text>
                            <Icon style={s.button} name={(this.props.selected)?"chevron-circle-up":"chevron-circle-down"} size={20} color={"#F37521"}/>
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    this.props.selected &&
                    <View style={s.extended}>
                        <Text> {this.props.paymentMethod.name} </Text>
                        <View style={s.billing}>
                            <View style={s.billingParticulars}>
                                <Text style={s.billingText}>Sub Total </Text>
                                <Text style={s.billingText}>Delivery </Text>
                                <Text style={s.billingText}>VAT (2%) </Text>
                                <Text style={s.billingText}>Total </Text>
                            </View>
                            <View style={s.billingPricesWrapper}>
                                <View>
                                    <Text style={s.billingText}>₹ </Text>
                                    <Text style={s.billingText}>₹ </Text>
                                    <Text style={s.billingText}>₹ </Text>
                                    <Text style={s.billingText}>₹ </Text>
                                </View>
                                <View style={s.billingPrices}>
                                    <Text style={s.billingText}>{ parseFloat(this.props.order.sub_total).toFixed(2) }</Text>
                                    <Text style={s.billingText}>{ parseFloat(this.props.order.delivery).toFixed(2) }</Text>
                                    <Text style={s.billingText}>{ parseFloat(this.props.order.vat).toFixed(2) }</Text>
                                    <Text style={s.billingText}>{ parseFloat(this.props.order.total).toFixed(2) }</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </View>
        );

    }

}

const s = StyleSheet.create({
    parent: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5
    },
    shortView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    shortViewPrice: { padding: 6 },
    leftPane: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    date: { fontSize: 15, paddingRight: 5 },
    time: { fontSize: 12 },
    rightPane: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    extended: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 5
    },
    billing: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    billingPricesWrapper: {
        flexDirection: 'row'
    },
    billingPrices: {
        paddingLeft: 5,
        alignItems: 'flex-end'
    },
    billingParticulars: {

    },
    button: {
        paddingLeft: 10,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },
    icon: {
        width: 35,
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    billingText: {
        paddingTop: 10
    }
});

export default Order;
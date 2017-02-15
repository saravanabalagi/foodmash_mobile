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

    getIconForOrderStatus = (status) => {
        switch (status) {
            case "Processing": return "spinner";
            case "Ready": return "bell";
            case "Purchased": return "inr";
            case "Completed": return "check";
            case "Cancelled": return "times";
        }
        return "question-circle";
    };

    getIconForPaymentMethod = (method) => {
        switch (method) {
            case "COD": return "money";
            case "Netbanking": return "globe";
            case "Card": return "credit-card";
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
                            <View style={s.icon}><Icon name={this.getIconForOrderStatus(this.props.orderStatus?this.props.orderStatus.name:"")} size={15} color={"#007402"}/></View>
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
                        <View style={s.status}>
                            <View style={s.orderStatus}>
                                <Icon style={s.statusIcon} name={this.getIconForOrderStatus(this.props.orderStatus?this.props.orderStatus.name:"")} size={20} color={"#F37521"}/>
                                <Text> {this.props.orderStatus?this.props.orderStatus.name:"Loading"} </Text>
                            </View>
                            <View style={s.paymentMethod}>
                                <Icon style={s.statusIcon} name={this.getIconForPaymentMethod(this.props.paymentMethod?this.props.paymentMethod.name:"")} size={20} color={"#F37521"}/>
                                <Text> {this.props.paymentMethod.name} </Text>
                            </View>
                        </View>
                        <View style={s.orderStatusProgress}>
                            <View style={[s.orderStatusProgressBar, this.getOrderStatusProgressBarStyle(0)]}/>
                            <View style={[s.orderStatusProgressBar, this.getOrderStatusProgressBarStyle(1)]}/>
                            <View style={[s.orderStatusProgressBar, this.getOrderStatusProgressBarStyle(2)]}/>
                            <View style={[s.orderStatusProgressBar, this.getOrderStatusProgressBarStyle(3)]}/>
                        </View>
                        <View style={s.billing}>
                            <View style={s.billingRow}>
                                <Text style={s.billingText}>Sub Total</Text>
                                <View style={s.priceWrapper}>
                                    <Text style={s.rupeeSymbol}>₹ </Text>
                                    <Text style={s.price}>{ parseFloat(this.props.order.sub_total).toFixed(2) }</Text>
                                </View>
                            </View>
                            <View style={s.billingRow}>
                                <Text style={s.billingText}>Delivery</Text>
                                <View style={s.priceWrapper}>
                                    <Text style={s.rupeeSymbol}>₹ </Text>
                                    <Text style={s.price}>{ parseFloat(this.props.order.delivery).toFixed(2) }</Text>
                                </View>
                            </View>
                            <View style={s.billingRow}>
                                <Text style={s.billingText}>VAT (2%)</Text>
                                <View style={s.priceWrapper}>
                                    <Text style={s.rupeeSymbol}>₹ </Text>
                                    <Text style={s.price}>{ parseFloat(this.props.order.vat).toFixed(2) }</Text>
                                </View>
                            </View>
                            <View style={s.billingTextSeparator}/>
                            <View style={s.billingRow}>
                                <Text style={s.billingText}>Total </Text>
                                <View style={s.priceWrapper}>
                                    <Text style={s.rupeeSymbol}>₹ </Text>
                                    <Text style={s.price}>{ parseFloat(this.props.order.total).toFixed(2) }</Text>
                                </View>
                            </View>
                            <View style={s.billingTextSeparator}/>
                        </View>
                    </View>
                }
            </View>
        );

    }

    getOrderStatusProgressBarStyle = (index) => {
        let backgroundColor = '#E6E6E6';
        switch (index) {
            case 0: if(this.props.orderStatus.name == "Purchased") backgroundColor = "#00a803";
            case 1: if(this.props.orderStatus.name == "Processing") backgroundColor = "#00a803";
            case 2: if(this.props.orderStatus.name == "Ready") backgroundColor = "#00a803";
            case 3: if(this.props.orderStatus.name == "Completed") backgroundColor = "#00a803";
        }
        if(this.props.orderStatus.name == "Cancelled") backgroundColor = "#e10000";
        return ({backgroundColor: backgroundColor});
    };

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
        marginTop: 5,
        paddingLeft: 25,
        paddingRight: 25,
        marginBottom: 5
    },
    status: { flexDirection: 'row', padding: 10 },
    statusIcon: { marginRight: 5 },
    orderStatus: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
    paymentMethod: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
    orderStatusProgress: { flexDirection: 'row', marginTop: 5, marginBottom: 10 },
    orderStatusProgressBar: {
        flex: 1,
        height: 4,
        margin: 2,
        borderRadius: 5
    },
    billing: {},
    billingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    priceWrapper: { flexDirection: 'row'},
    price: {},
    billingTextSeparator: {
        marginTop: 5,
        marginBottom: 5,
        flex: 1,
        height: 1,
        backgroundColor: '#333'
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
    }
});

export default Order;
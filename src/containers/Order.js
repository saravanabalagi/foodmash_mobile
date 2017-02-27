import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ListView,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';

import Icon from 'react-native-vector-icons/FontAwesome';
import OrderItem from './OrderItem';

import {fetchOrder} from '../reducers/order/orderActions';
import {fetchPaymentMethod} from '../reducers/paymentMethod/paymentMethodActions';
import {fetchOrderStatus} from '../reducers/orderStatus/orderStatusActions';
import {fetchRestaurant} from '../reducers/restaurant/restaurantActions';

@connect((store,props) => {
    return {
        order: store.order.orders[props.orderId],
        inProgress: store.order.inProgress,
        orderStatuses: store.orderStatus.orderStatuses,
        paymentMethods: store.paymentMethod.paymentMethods,
        dishVariants: store.dishVariant.dishVariants,
        dishes: store.dish.dishes,
        restaurants: store.restaurant.restaurants,
    };
})


class Order extends React.Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (a,b)=>a!==b});
    }

    componentWillMount = () => {
        if(this.props.order) {
            this.props.dispatch(fetchOrderStatus(this.props.order.order_status_id));
            this.props.dispatch(fetchPaymentMethod(this.props.order.payment_method_id));
            this.props.order.restaurant_orders.forEach(restaurantOrder => {
                this.props.dispatch(fetchRestaurant(restaurantOrder.restaurant_id));
                this.props.dispatch(fetchOrderStatus(restaurantOrder.order_status_id));
            });
        } else this.props.dispatch(fetchOrder(this.props.orderId))
    };

    componentWillReceiveProps = (nextProps) => {
        let orderId = nextProps.orderId;
        let order = orderId?nextProps.order:null;
        let orderStatus = order?nextProps.orderStatuses[order.order_status_id]:null;
        let paymentMethod = order?nextProps.paymentMethods[order.paymentMethod_id]:null;

        if(orderId && order==null) this.props.dispatch(fetchOrder(nextProps.orderId));
        if(orderId && order && orderStatus==null) this.props.dispatch(fetchOrderStatus(nextProps.order.order_status_id));
        if(orderId && order && paymentMethod==null) this.props.dispatch(fetchPaymentMethod(nextProps.order.payment_method_id));
        if(orderId && order)
            order.restaurant_orders.forEach(restaurantOrder=> {
                this.props.dispatch(fetchRestaurant(restaurantOrder.restaurant_id));
                this.props.dispatch(fetchOrderStatus(restaurantOrder.order_status_id));
            });
    };

    getOrderStatus = () => { return this.props.order?this.props.orderStatuses[this.props.order.order_status_id]:null };
    getPaymentMethod = () => { return this.props.order?this.props.paymentMethods[this.props.order.payment_method_id]:null };

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

    getPickupCode = (restaurantOrder) => {
        let orderStatus = this.props.orderStatuses[restaurantOrder.order_status_id];
        if(orderStatus)
            switch(orderStatus.name) {
                case "Purchased": return "WAITING";
                case "Rejected": return "REJECTED";
                case "Accepted":
                case "Completed":
                case "Ready": return restaurantOrder.pickup_code;
            }
        else return null;
    };

    getRestaurantStatusIcon = (restaurantOrder) => {
        let orderStatus = this.props.orderStatuses[restaurantOrder.order_status_id];
        if(orderStatus)
            switch(orderStatus.name) {
                case "Ready": return "bell";
                case "Completed": return "check-circle";
                case "Rejected": return "times-circle";
            }
        else return null;
    };

    render() {
        return (
            <View style={s.parent}>
                <View style={s.titleBar}>
                    <TouchableOpacity onPress={Actions.pop}><Icon style={s.backIcon} name={"angle-left"} size={25} color={"#000a74"}/></TouchableOpacity>
                    <View style={s.titleWrapper}>
                        <Icon style={s.orderIcon} name={"file-text"} size={20} color={"#e16800"}/>
                        <Text style={s.title}>Order</Text>
                    </View>
                    <View style={{width:60}}/>
                </View>
                <View style={s.orderDetails}>
                    <View style={s.orderDetailsLeft}>
                        <Text>ORDER ID</Text>
                        <Text style={s.orderId}>#{this.props.order.id}</Text>
                    </View>
                    <View style={s.orderDetailsRight}>
                    <Text style={s.date}>{ moment(new Date(this.props.order.ordered_at)).format('ll') }</Text>
                    <Text style={s.time}>{ moment(new Date(this.props.order.ordered_at)).format('LT') }</Text>
                    </View>
                </View>
                <ListView style={s.orderItems}
                          dataSource={this.ds.cloneWithRows(this.props.order.restaurant_orders)}
                          enableEmptySections={true}
                          showsVerticalScrollIndicator={true}
                          renderRow={restaurant_order=>{
                              return (
                                  <View key={restaurant_order.restaurant_id}>
                                      <View style={s.restaurantWrapper}>
                                          <View style={s.restaurantNameWrapper}>
                                              <Icon name={"angle-right"} size={20} color={"#e16800"}/>
                                              <Text style={s.restaurantName}>{this.props.restaurants[restaurant_order.restaurant_id]
                                                            ? this.props.restaurants[restaurant_order.restaurant_id].name
                                                            : "Loading"}</Text>
                                          </View>
                                          { this.getPickupCode(restaurant_order) && <Text style={s.pickupCode}>{this.getPickupCode(restaurant_order)}</Text>}
                                          { !this.getPickupCode(restaurant_order) && <Text style={s.pickupCode}>Loading</Text>}
                                          { this.getRestaurantStatusIcon(restaurant_order)=="bell" && <Icon style={s.restaurantStatusIcon} name={this.getRestaurantStatusIcon(restaurant_order)} size={20} color={"#e16800"}/>}
                                          { this.getRestaurantStatusIcon(restaurant_order)=="check-circle" && <Icon style={s.restaurantStatusIcon} name={"check-circle"} size={20} color={"#00a803"}/>}
                                          { this.getRestaurantStatusIcon(restaurant_order)=="times-circle" && <Icon style={s.restaurantStatusIcon} name={"times-circle"} size={20} color={"#e10000"}/>}
                                      </View>
                                      <View>
                                      {restaurant_order.order_items.map(orderItem => {
                                          return <OrderItem
                                              key={orderItem.id}
                                              orderItem={orderItem}/>})}
                                      </View>
                                  </View>
                              )
                          }}>
                </ListView>
                <View style={s.status}>
                    <View style={s.orderStatus}>
                        <Icon style={s.statusIcon} name={this.getIconForOrderStatus(this.getOrderStatus()?this.getOrderStatus().name:"")} size={20} color={"#F37521"}/>
                        <Text> {this.getOrderStatus()?this.getOrderStatus().name:"Loading"} </Text>
                    </View>
                    <View style={s.paymentMethod}>
                        <Icon style={s.statusIcon} name={this.getIconForPaymentMethod(this.getPaymentMethod()?this.getPaymentMethod().name:"")} size={20} color={"#F37521"}/>
                        <Text> {this.getPaymentMethod().name} </Text>
                    </View>
                </View>
                <View style={s.orderStatusProgress}>
                    <View style={[s.orderStatusProgressBar, this.getOrderStatusProgressBarStyle(0)]}/>
                    <View style={[s.orderStatusProgressBar, this.getOrderStatusProgressBarStyle(1)]}/>
                    <View style={[s.orderStatusProgressBar, this.getOrderStatusProgressBarStyle(2)]}/>
                    <View style={[s.orderStatusProgressBar, this.getOrderStatusProgressBarStyle(3)]}/>
                </View>
                <View style={s.billing}>
                    <View style={s.billingLeft}>
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
                    </View>
                    <View style={s.billingTextSeparator}/>
                    <View style={s.billingRight}>
                        <Text style={s.totalText}>GRAND TOTAL</Text>
                        <Text style={s.total}>₹ { parseFloat(this.props.order.total).toFixed(2) }</Text>
                    </View>
                </View>
            </View>
        );

    }

    getOrderStatusProgressBarStyle = (index) => {
        let backgroundColor = '#EEE';
        switch (index) {
            case 0: if(this.getOrderStatus().name == "Purchased") backgroundColor = "#00a803";
            case 1: if(this.getOrderStatus().name == "Processing") backgroundColor = "#00a803";
            case 2: if(this.getOrderStatus().name == "Ready") backgroundColor = "#00a803";
            case 3: if(this.getOrderStatus().name == "Completed") backgroundColor = "#00a803";
        }
        if(this.getOrderStatus() && this.getOrderStatus().name == "Cancelled") backgroundColor = "#e10000";
        return ({backgroundColor: backgroundColor});
    };

}

const s = StyleSheet.create({
    parent: {
        flex:1,
        marginBottom: 80
    },
    titleBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#EEE',
    },
    backIcon: { padding: 20 },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: { fontSize: 20 },
    orderIcon: { marginRight: 5 },
    orderDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        margin: [0,15]
    },
    orderDetailsLeft: {
        flex: 2,
        padding: 15,
        alignItems: 'center'
    },
    orderDetailsRight: {
        flex: 3,
        padding: 15,
        alignItems: 'center'
    },
    orderId: { fontSize: 20 },
    date: { fontSize: 17 },
    time: { fontSize: 12 },
    orderItems: {
        flex: 1,
        padding: [0, 10],
    },
    restaurantWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    restaurantNameWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    restaurantName: {
        padding: 10,
        fontSize: 20,
    },
    pickupCode: {
        padding: [5,10],
        backgroundColor: '#F0F0F0',
        borderColor: '#BBB',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 4
    },
    restaurantStatusIcon: { padding: [5,0,0,10] },
    status: {
        flexDirection: 'row',
        padding: [15,0],
        margin: [0,15],
        borderTopWidth: 1,
        borderTopColor: '#CCC'
    },
    statusIcon: { marginRight: 5 },
    orderStatus: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    paymentMethod: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    orderStatusProgress: {
        flexDirection: 'row',
        margin: [0,10,0,10]
    },
    orderStatusProgressBar: {
        flex: 1,
        height: 4,
        margin: 2,
        borderRadius: 5
    },
    billing: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: [0,10,5,10]
    },
    billingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: [5,10,5,10]
    },
    billingLeft: {
        flex: 3,
        padding: [10,10,10,0]
    },
    billingRight: {
        flex: 2,
        padding: [10,0,10,10],
        alignItems: 'center'
    },
    priceWrapper: {
        flexDirection: 'row'
    },
    price: {},
    rupeeSymbol: {},
    billingText: {},
    total: { fontSize: 20 },
    totalText: {
        fontSize: 12,
        marginBottom: 5
    },
    billingTextSeparator: {
        width: 1,
        height: 90,
        backgroundColor: '#CCC'
    },
    button: {
        paddingLeft: 10,
        paddingRight: 10
    },
});

export default Order;
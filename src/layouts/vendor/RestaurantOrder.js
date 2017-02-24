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
import RestaurantOrderItem from '../../containers/vendor/RestaurantOrderItem';
import Loading from '../../views/Loading';

import {makeRestaurantOrder} from '../../reducers/vendor/restaurantOrder/restaurantOrderActions';
import {fetchPaymentMethod} from '../../reducers/paymentMethod/paymentMethodActions';
import {fetchRestaurantOrder} from '../../reducers/vendor/restaurantOrder/restaurantOrderActions';
import {fetchOrderStatus} from '../../reducers/orderStatus/orderStatusActions';

@connect((store,props) => {
    return {
        restaurantOrder: store.vendor.restaurantOrder.restaurantOrders[props.restaurantOrderId],
        inProgress: store.vendor.restaurantOrder.inProgress,
        orderStatuses: store.orderStatus.orderStatuses,
        paymentMethods: store.paymentMethod.paymentMethods,
        dishVariants: store.dishVariant.dishVariants,
        dishes: store.dish.dishes,
    };
})


class RestaurantOrder extends React.Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (a,b)=>a!==b});
    }

    componentWillMount = () => {
        if(this.props.restaurantOrder) {
            this.props.dispatch(fetchOrderStatus(this.props.restaurantOrder.order_status_id));
            this.props.dispatch(fetchPaymentMethod(this.props.restaurantOrder.payment_method_id));
        } else this.props.dispatch(fetchRestaurantOrder(this.props.restaurantOrderId))
    };

    componentWillReceiveProps = (nextProps) => {
        let restaurantOrder = nextProps.restaurantOrder;
        let orderStatus = restaurantOrder?nextProps.orderStatuses[restaurantOrder.order_status_id]:null;
        let paymentMethod = restaurantOrder?nextProps.paymentMethods[restaurantOrder.paymentMethod_id]:null;

        if(restaurantOrder && orderStatus==null) this.props.dispatch(fetchOrderStatus(nextProps.restaurantOrder.order_status_id));
        if(restaurantOrder && paymentMethod==null) this.props.dispatch(fetchPaymentMethod(nextProps.restaurantOrder.payment_method_id));
    };

    getOrderStatus = () => { return this.props.restaurantOrder?this.props.orderStatuses[this.props.restaurantOrder.order_status_id]:null };
    getPaymentMethod = () => { return this.props.restaurantOrder?this.props.paymentMethods[this.props.restaurantOrder.payment_method_id]:null };

    getIconForOrderStatus = (status) => {
        switch (status) {
            case "Accepted": return "spinner";
            case "Ready": return "bell";
            case "Purchased": return "inr";
            case "Completed": return "check";
            case "Rejected": return "times";
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

    getStatusChangeButtonName = () => {
        if(this.getOrderStatus())
            switch (this.getOrderStatus().name) {
                case "Purchased": return "APPROVE";
                case "Accepted": return "READY";
                case "Ready": return "COLLECTED";
            }
        return "Loading";
    };

    handleAction = (action) => {
        if(action!="reject")
            switch(this.getOrderStatus().name) {
                case "Purchased": action="approve"; break;
                case "Accepted": action="ready"; break;
                case "Ready": action="collected"; break;
                default: return
            }
        this.props.dispatch(makeRestaurantOrder(this.props.restaurantOrder.id,action));
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
                { !this.props.restaurantOrder && <Loading /> }
                {
                    this.props.restaurantOrder &&
                    <View style={{flex:1}}>
                        <View style={s.orderDetails}>
                            <View style={s.orderDetailsLeft}>
                                <Text>Order ID</Text>
                                <Text style={s.orderId}>{this.props.restaurantOrder.pickup_code}</Text>
                            </View>
                            <View style={s.orderDetailsRight}>
                            <Text style={s.date}>{ moment(new Date(this.props.restaurantOrder.ordered_at)).format('ll') }</Text>
                            <Text style={s.time}>{ moment(new Date(this.props.restaurantOrder.ordered_at)).format('LT') }</Text>
                            </View>
                        </View>
                        { this.props.inProgress.includes(this.props.restaurantOrder.id) && <Loading /> }
                        <ListView style={s.orderItems}
                                  dataSource={this.ds.cloneWithRows(this.props.restaurantOrder.order_items)}
                                  enableEmptySections={true}
                                  showsVerticalScrollIndicator={true}
                                  renderRow={orderItem=>{
                                      return <RestaurantOrderItem
                                                  key={orderItem.id}
                                                  orderItem={orderItem}/>
                                  }}>
                        </ListView>
                        <View style={s.status}>
                            <View style={s.orderStatus}>
                                <Icon style={s.statusIcon} name={this.getIconForOrderStatus(this.getOrderStatus()?this.getOrderStatus().name:"")} size={20} color={"#F37521"}/>
                                <Text> {this.getOrderStatus()?this.getOrderStatus().name:"Loading"} </Text>
                            </View>
                            {
                                this.getOrderStatus() &&
                                (this.getOrderStatus().name=="Completed" ||
                                this.getOrderStatus().name=="Rejected") &&
                                <View style={s.paymentMethod}>
                                    <Icon style={s.statusIcon} name={this.getIconForPaymentMethod(this.getPaymentMethod()?this.getPaymentMethod().name:"")} size={20} color={"#F37521"}/>
                                    <Text> {this.getPaymentMethod().name} </Text>
                                </View>
                            }
                            {
                                this.getOrderStatus() &&
                                this.getOrderStatus().name!="Completed" &&
                                this.getOrderStatus().name!="Rejected" &&
                                <View style={[s.statusChangeButtonWrapper,this.getStatusChangeButtonWrapperFlex()]}>
                                    <TouchableOpacity
                                        style={[s.statusChangeButton,this.getStatusChangeButtonStyle()]}
                                        disabled={this.props.inProgress.includes(this.props.restaurantOrderId)}
                                        onPress={()=>{this.handleAction()}}>
                                        <Text style={s.statusButtonText}>{this.getStatusChangeButtonName()}</Text>
                                    </TouchableOpacity>
                                    {
                                        this.getOrderStatus() && this.getOrderStatus().name=="Purchased" &&
                                        <TouchableOpacity
                                            style={[s.statusChangeButton, s.rejectButton]}
                                            disabled={this.props.inProgress.includes(this.props.restaurantOrderId)}
                                            onPress={() => {this.handleAction("reject")}}>
                                            <Text style={s.statusButtonText}>REJECT</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            }
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
                                    <Text style={s.billingText}>Items</Text>
                                    <View style={s.priceWrapper}>
                                        <Text style={s.rupeeSymbol}>  </Text>
                                        <Text style={s.price}>{this.props.restaurantOrder.order_items.length} { this.props.restaurantOrder.order_items.length>1?"items":"item" }</Text>
                                    </View>
                                </View>
                                <View style={s.billingRow}>
                                    <Text style={s.billingText}>Sub Total</Text>
                                    <View style={s.priceWrapper}>
                                        <Text style={s.rupeeSymbol}>₹ </Text>
                                        <Text style={s.price}>{ parseFloat(this.props.restaurantOrder.total).toFixed(2) }</Text>
                                    </View>
                                </View>
                                <View style={s.billingRow}>
                                    <Text style={s.billingText}>Packing</Text>
                                    <View style={s.priceWrapper}>
                                        <Text style={s.rupeeSymbol}>₹ </Text>
                                        <Text style={s.price}>0.00</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={s.billingTextSeparator}/>
                            <View style={s.billingRight}>
                                <Text style={s.totalText}>GRAND TOTAL</Text>
                                <Text style={s.total}>₹ { parseFloat(this.props.restaurantOrder.total).toFixed(2) }</Text>
                            </View>
                        </View>
                    </View>
                }
            </View>
        );

    }

    getStatusChangeButtonWrapperFlex = () => { return {flex:(this.getOrderStatus() && this.getOrderStatus().name=="Purchased")?1.3:1}; };
    getStatusChangeButtonStyle = () => {
        let backgroundColor = '#666';
        let paddingLeft = 20;
        let paddingRight = 20;
        if(this.getOrderStatus())
            switch (this.getOrderStatus().name) {
                case "Purchased": backgroundColor = "#669966"; paddingLeft=10; paddingRight=10; break;
                case "Accepted": backgroundColor = "#66A055"; break;
                case "Ready": backgroundColor = "#66AA44"; break;
            }
        return ({backgroundColor: backgroundColor, paddingLeft:paddingLeft, paddingRight:paddingRight });
    };

    getOrderStatusProgressBarStyle = (index) => {
        let backgroundColor = '#EEE';
        if(this.getOrderStatus())
            switch (index) {
                case 0: if(this.getOrderStatus().name == "Purchased") backgroundColor = "#00a803";
                case 1: if(this.getOrderStatus().name == "Accepted") backgroundColor = "#00a803";
                case 2: if(this.getOrderStatus().name == "Ready") backgroundColor = "#00a803";
                case 3: if(this.getOrderStatus().name == "Completed") backgroundColor = "#00a803";
            }
        if(this.getOrderStatus() && this.getOrderStatus().name == "Rejected") backgroundColor = "#e10000";
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
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        padding: [10,0],
        margin: [0,15],
        borderTopWidth: 1,
        borderTopColor: '#CCC',
    },
    statusIcon: { marginRight: 5 },
    orderStatus: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    statusChangeButtonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusChangeButton: {
        backgroundColor: '#666',
        padding: 10,
        margin: [0,5],
        borderRadius: 5
    },
    statusButtonText: {
        fontSize: 12,
        color: '#FFF'
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

export default RestaurantOrder;
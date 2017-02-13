import React from 'react';
import {
    Text,
    View,
    TextInput,
    ScrollView,
    StyleSheet
} from 'react-native'

import {connect} from 'react-redux';
import {fetchOrders} from '../reducers/order/orderActions';
import Order from '../views/Order';
import Loading from '../views/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';

@connect((store) => {
    return {
        orders: store.order.orders,
        inProgress: store.order.inProgress,
        error: store.order.error
    };
})

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOrder: null
        };
    }

    componentDidMount = () => { this.props.dispatch(fetchOrders()) };
    selectOrder = (order) => { if(this.state.selectedOrder==null || this.state.selectedOrder.id!==order.id) this.setState({selectedOrder: order}); else this.setState({selectedOrder: null}); };

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress && <Loading/> }
                {
                    this.props.orders.length === 0 &&
                    <View style={s.noOrdersLayout}>
                        <Icon name={"exclamation-triangle"} size={100} color={"#e16800"}/>
                        <Text style={s.ordersEmpty}>You haven't ordered yet</Text>
                        <Text style={s.getReady}>Get ready to eat now</Text>
                    </View>
                }
                {
                    this.props.orders.length>0 &&
                    <ScrollView style={s.scrollableArea}>
                        <View>
                            {
                                    this.props.orders.map((order) => {
                                    return <Order
                                        selected={this.state.selectedOrder && order.id === this.state.selectedOrder.id}
                                        select={() => this.selectOrder(order)}
                                        key={order.id}
                                        order={order}/>
                                })
                            }
                        </View>
                    </ScrollView>
                }
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
            </View>
        );

    }

}

const s = StyleSheet.create({
    parent: {
        flex: 1
    },
    noOrdersLayout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ordersEmpty: {
        fontSize: 15,
        marginTop: 20
    },
    getReady: {
        fontSize: 17,
        padding: 5
    },
    scrollableArea: {
        marginTop: 10
    }
});

export default OrderList;
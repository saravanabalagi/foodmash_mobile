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
            <ScrollView>
                <View style={s.parent}>
                    { this.props.inProgress && <Loading/> }
                    {
                        this.props.orders.map((order) => {
                            return <Order
                                selected={this.state.selectedOrder && order.id===this.state.selectedOrder.id}
                                select={()=>this.selectOrder(order)}
                                key={order.id}
                                order={order} />
                        })
                    }
                    { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
                </View>
            </ScrollView>
        );

    }

}

const s = StyleSheet.create({
    parent: {
        marginTop: 10
    }
});

export default OrderList;
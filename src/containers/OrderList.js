import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet
} from 'react-native'
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {fetchOrders} from '../reducers/order/orderActions';
import Order from '../views/Order';

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
        this.state = {};
    }

    componentDidMount = () => { this.props.dispatch(fetchOrders()) };

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress && <Text> inProgress </Text> }
                {
                    this.props.orders.map((order) => {
                        return <Order key={order.id} order={order} />
                    })
                }
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
            </View>
        );

    }

}

const s = StyleSheet.create({

});

export default OrderList;
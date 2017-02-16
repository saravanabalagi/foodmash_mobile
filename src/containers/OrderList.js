import React from 'react';
import {
    Text,
    View,
    TextInput,
    ScrollView,
    StyleSheet,
    RefreshControl
} from 'react-native'

import {connect} from 'react-redux';
import {fetchOrders} from '../reducers/order/orderActions';
import OrderMini from './OrderMini';
import Loading from '../views/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';

@connect((store) => {
    return {
        orders: store.order.orders.sort((a,b)=>new Date(b.ordered_at)-new Date(a.ordered_at)),
        inProgress: store.order.inProgress,
        error: store.order.error
    };
})

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            priceWidth: 0,
            refreshing: false
        };
    }

    componentWillMount = () => { this.props.dispatch(fetchOrders()) };
    updatePriceWidth = (width) => { this.state.priceWidth<width && this.setState({priceWidth: width}); };

    componentWillReceiveProps = (nextProps) => {
        if(this.state.refreshing
            && this.props.inProgress
            && nextProps.inProgress == false)
            this.setState({refreshing: false});
    };
    refreshOrders = () => {
        this.setState({refreshing: true});
        this.props.dispatch(fetchOrders());
    };

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress && <Loading/> }
                {
                    !this.props.inProgress && this.props.orders.length === 0 &&
                    <View style={s.noOrdersLayout}>
                        <Icon name={"exclamation-triangle"} size={100} color={"#e16800"}/>
                        <Text style={s.ordersEmpty}>You haven't ordered yet</Text>
                        <Text style={s.getReady}>Get ready to eat now</Text>
                    </View>
                }
                {
                    this.props.orders.length>0 &&
                    <ScrollView style={s.scrollableArea}
                                refreshControl={<RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.refreshOrders}/>}>
                        <View>
                            {
                                    this.props.orders.map((order) => {
                                    return <OrderMini
                                        priceWidth={this.state.priceWidth}
                                        updatePriceWidth={this.updatePriceWidth}
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
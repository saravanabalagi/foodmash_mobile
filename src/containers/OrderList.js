import React from 'react';
import {
    Text,
    View,
    TextInput,
    ListView,
    StyleSheet,
    RefreshControl,
    TouchableOpacity
} from 'react-native'

import {connect} from 'react-redux';
import {fetchOrders} from '../reducers/order/orderActions';
import OrderMini from './OrderMini';
import Loading from '../views/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';

import {getErrorDisplayString} from '../helpers/errorHelper';
import SnackBar from 'react-native-snackbar-dialog';

@connect((store) => {
    return {
        orders: Object.values(store.order.orders).sort((a,b)=>new Date(b.ordered_at)-new Date(a.ordered_at)),
        inProgress: store.order.inProgress,
        error: store.order.error,
        lastPageFetched: store.order.lastPageFetched,
        totalPages: store.order.totalPages
    };
})

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (a,b)=>a!==b});
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
        if(this.props.error!=nextProps.error && Object.values(nextProps.error).length>0)
            Object.values(nextProps.error).reduce((errors,error)=>
                error!=null&&errors.includes(getErrorDisplayString(error))?(errors.push(getErrorDisplayString(error)),errors):errors,[])
                .forEach(errorString=> SnackBar.add(errorString,{ confirmText:"Dismiss", onConfirm: ()=>SnackBar.dismiss()}));
    };

    refreshOrders = () => { this.setState({refreshing: true, priceWidth: 0},()=>{this.props.dispatch(fetchOrders());}); };
    fetchMoreOrders = () => { this.props.dispatch(fetchOrders(this.props.lastPageFetched+1)) };

    renderFooter = () => {
        return (
            <View>
                {
                    this.props.lastPageFetched &&
                    this.props.totalPages &&
                    this.props.lastPageFetched!==this.props.totalPages &&
                    <TouchableOpacity
                        onPress={this.fetchMoreOrders}
                        disabled={this.props.inProgress.some(id=>id<-1)}
                        style={s.loadMoreWrapper}>
                        <Text style={s.loadMoreText}>{this.props.inProgress.some(id=>id<0)?"Loading...":"Load more orders"}</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    };

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress.length>0 && !this.props.inProgress.some(id=>id<-1) && <Loading/> }
                {
                    !this.props.inProgress.length>0 && this.props.orders.length === 0 &&
                    <View style={s.noOrdersLayout}>
                        <Icon name={"exclamation-triangle"} size={100} color={"#e16800"}/>
                        <Text style={s.ordersEmpty}>{"You haven't ordered yet"}</Text>
                        <Text style={s.getReady}>{"Get ready to eat now"}</Text>
                    </View>
                }
                {
                    this.props.orders.length>0 &&
                    <ListView dataSource={this.ds.cloneWithRows(this.props.orders)}
                              enableEmptySections={true}
                              style={s.scrollableArea}
                                refreshControl={<RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.refreshOrders}/>}
                              renderFooter={this.renderFooter}
                              renderRow={(order) => {
                                  return <OrderMini
                                      priceWidth={this.state.priceWidth}
                                      updatePriceWidth={this.updatePriceWidth}
                                      key={order.id}
                                      order={order}/>
                              }}>
                    </ListView>
                }
            </View>
        );

    }

}

const s = StyleSheet.create({
    parent: { flex: 1},
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
    scrollableArea: { marginTop: 10},

    loadMoreWrapper: {
        alignItems: 'center',
        marginTop: 10
    },
    loadMoreText: {
        padding: [10,20],
        backgroundColor: '#EEE',
        borderRadius: 5,
    }

});

export default OrderList;
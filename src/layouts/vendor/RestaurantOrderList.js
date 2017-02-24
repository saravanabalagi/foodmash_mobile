import React from 'react';
import {
    Text,
    View,
    TextInput,
    ListView,
    StyleSheet,
    RefreshControl
} from 'react-native'

import {connect} from 'react-redux';
import {fetchRestaurant} from '../../reducers/restaurant/restaurantActions';
import {fetchRestaurantOrders} from '../../reducers/vendor/restaurantOrder/restaurantOrderActions';
import RestaurantOrderMini from '../../containers/vendor/RestaurantOrderMini';
import Loading from '../../views/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

@connect((store) => {
    return {
        restaurant_id: store.user.user.roles.filter(role=>role.resource_type=="Restaurant")[0].resource_id,
        restaurant: store.restaurant.restaurants[store.user.user.roles.filter(role=>role.resource_type=="Restaurant")[0].resource_id],
        restaurantOrders: Object.values(store.vendor.restaurantOrder.restaurantOrders).sort((a,b)=>new Date(b.ordered_at)-new Date(a.ordered_at)),
        inProgress: store.vendor.restaurantOrder.inProgress,
        error: store.vendor.restaurantOrder.error
    };
})

class RestaurantOrderList extends React.Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (a,b)=>a!==b});
        this.state = {
            priceWidth: 0,
            refreshing: false
        };
    }
    componentWillMount = () => {
        this.props.dispatch(fetchRestaurantOrders());
        this.props.restaurant_id && this.props.dispatch(fetchRestaurant(this.props.restaurant_id))
    };

    componentWillReceiveProps = (nextProps) => {
        if(this.state.refreshing
            && this.props.inProgress
            && nextProps.inProgress == false)
            this.setState({refreshing: false});
    };

    updatePriceWidth = (width) => { this.state.priceWidth<width && this.setState({priceWidth: width}); };
    refreshOrders = () => { this.setState({refreshing: true, priceWidth: 0},()=>{this.props.dispatch(fetchRestaurantOrders());}); };

    render() {
        return (
            <View style={s.parent}>
                <View style={s.titleBar}>
                    <View style={{width:60}}/>
                    <View style={s.titleWrapper}>
                        <MaterialIcon style={s.orderIcon} name={"restaurant-menu"} size={20} color={"#e16800"}/>
                        <Text style={s.title}>{this.props.restaurant?this.props.restaurant.name:"Loading"}</Text>
                    </View>
                    <View style={{width:60}}/>
                </View>
                { this.props.inProgress.length>0 && <Loading/> }
                {
                    !this.props.inProgress.length>0 && this.props.restaurantOrders.length === 0 &&
                    <View style={s.noOrdersLayout}>
                        <Icon name={"exclamation-triangle"} size={100} color={"#e16800"}/>
                        <Text style={s.ordersEmpty}>You haven't ordered yet</Text>
                        <Text style={s.getReady}>Get ready to eat now</Text>
                    </View>
                }
                {
                    this.props.restaurantOrders.length>0 &&
                    <ListView dataSource={this.ds.cloneWithRows(this.props.restaurantOrders)}
                              enableEmptySections={true}
                              style={s.scrollableArea}
                                refreshControl={<RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.refreshOrders}/>}
                              renderRow={(restaurantOrder) => {
                                  return <RestaurantOrderMini
                                      priceWidth={this.state.priceWidth}
                                      updatePriceWidth={this.updatePriceWidth}
                                      key={restaurantOrder.id}
                                      restaurantOrder={restaurantOrder}/>
                              }}>
                    </ListView>
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
    titleBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#EEE',
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: { fontSize: 20 },
    orderIcon: { marginRight: 5 },
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

export default RestaurantOrderList;
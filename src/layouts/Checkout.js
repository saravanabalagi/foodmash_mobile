import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {purchaseCart, getTotalItems} from '../reducers/cart/cartActions';

import {fetchLocation} from '../reducers/location/locationActions';
import {fetchCity} from '../reducers/city/cityActions';
import {fetchUser} from '../reducers/user/userActions';

import Loading from '../views/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

@connect((store) => {
    return {
        values: store.cart.values,
        restaurants: store.restaurant.restaurants,
        restaurantOrders: Object.values(store.cart.restaurant_orders),
        inProgress: store.cart.inProgress,
        user: store.user,
        location_id: store.user.location_id,
        locations: store.location.locations,
        cities: store.city.cities
    }
})

export default class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount = () => {
        if(this.props.location_id!=null)
            this.props.dispatch(fetchLocation(this.props.location_id));
        else this.props.dispatch(fetchUser());
    };

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.location_id!=null && this.props.location_id!=nextProps.location_id)
            this.props.dispatch(fetchLocation(nextProps.location_id));
        let location = nextProps.location_id? nextProps.locations[nextProps.location_id]:null;
        let city = location? nextProps.cities[location.city_id]:null;
        if(location && city==null) this.props.dispatch(fetchCity(location.city_id));
    };

    getLocation = () => { return (this.props.location_id)?this.props.locations[this.props.location_id]:null };
    getCity = () => { return (this.getLocation())?this.props.cities[this.getLocation().city_id]:null };

    render() {
        return (
            <View style={s.parent}>
                <View style={s.titleBar}>
                    <TouchableOpacity onPress={Actions.pop}><Icon style={s.backIcon} name={"angle-left"} size={25} color={"#000a74"}/></TouchableOpacity>
                    <View style={s.titleWrapper}>
                        <MaterialIcon style={s.checkoutIcon} name={"verified-user"} size={20} color={"#e16800"}/>
                        <Text style={s.title}>Checkout</Text>
                    </View>
                    <View style={{width:60}}/>
                </View>
                { this.props.inProgress && <Loading/> }
                <View style={s.mainContent}>
                    <View style={s.locationWrapper}>
                        <MaterialIcon style={s.locationIcon} name={"my-location"} size={25} color={"#e16800"}/>
                        <Text style={s.location}>{this.getLocation()?this.getLocation().name+", ":"Loading"}{this.getCity()?this.getCity().name:""}</Text>
                    </View>
                    <ScrollView>
                        <View style={s.restaurantWrapper}>
                            {
                                this.props.restaurantOrders.map(restaurantOrder=>{
                                    return <View style={s.restaurantRow}
                                                 key={restaurantOrder.restaurant_id}>
                                        <View style={s.restaurantNameWrapper}>
                                            <Icon name={"angle-right"} size={20} color={"#e16800"}/>
                                            <Text style={s.restaurantName}>{this.props.restaurants[restaurantOrder.restaurant_id]
                                                ?this.props.restaurants[restaurantOrder.restaurant_id].name
                                                :"Loading"}</Text>
                                        </View>
                                        <Text>{ restaurantOrder.order_items.length } {restaurantOrder.order_items.length>1?"items":"item"}</Text>
                                    </View>
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
                <View style={s.billing}>
                    <View style={s.billingLeft}>
                        <View style={s.billingRow}>
                            <Text style={s.billingText}>Sub Total</Text>
                            <View style={s.priceWrapper}>
                                <Text style={s.rupeeSymbol}>₹ </Text>
                                <Text style={s.price}>{ parseFloat(this.props.values.sub_total).toFixed(2) }</Text>
                            </View>
                        </View>
                        <View style={s.billingRow}>
                            <Text style={s.billingText}>Delivery</Text>
                            <View style={s.priceWrapper}>
                                <Text style={s.rupeeSymbol}>₹ </Text>
                                <Text style={s.price}>{ parseFloat(this.props.values.delivery).toFixed(2) }</Text>
                            </View>
                        </View>
                        <View style={s.billingRow}>
                            <Text style={s.billingText}>VAT (2%)</Text>
                            <View style={s.priceWrapper}>
                                <Text style={s.rupeeSymbol}>₹ </Text>
                                <Text style={s.price}>{ parseFloat(this.props.values.vat).toFixed(2) }</Text>
                            </View>
                        </View>
                    </View>
                    <View style={s.billingTextSeparator}/>
                    <View style={s.billingRight}>
                        <Text style={s.totalText}>GRAND TOTAL</Text>
                        <Text style={s.total}>₹ { parseFloat(this.props.values.total).toFixed(2) }</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={s.buttonSection}
                    onPress={()=> this.props.dispatch(purchaseCart())}>
                    <View style={s.buttonWrapper}>
                        <View style={s.buttonTextWrapper}>
                            <Text style={s.buttonTextTop}>Confirm and</Text>
                            <Text style={s.buttonTextBottom}>PAY NOW</Text>
                        </View>
                        <Icon name={"chevron-circle-right"} size={20} color={"#F37521"}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        flex: 1,
        marginBottom: 80
    },
    mainContent: {
        flex: 1
    },

    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: [20,20,10,20]
    },
    locationIcon: { marginRight: 10 },
    location: { fontSize: 17 },


    restaurantWrapper: { padding: [0,20] },
    restaurantRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    restaurantNameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    restaurantName: {
        padding: [5,10],
        fontSize: 20
    },


    buttonSection: {
        padding: [5,10],
        margin: [0,15],
        borderTopWidth: 1,
        borderTopColor: '#CCC'
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTextWrapper: {
        padding: 10,
        alignItems: 'center'
    },
    buttonTextTop: {},
    buttonTextBottom: {},
    button: { padding: 10},
    titleBar: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EEE',
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: { fontSize: 20 },
    checkoutIcon: { marginRight:5 },
    backIcon: { padding: 20 },
    billing: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: [0,10,0,10]
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
        height: 80,
        backgroundColor: '#CCC'
    }
});
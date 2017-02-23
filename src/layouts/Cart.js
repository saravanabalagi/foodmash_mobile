import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import Loading from '../views/Loading';

import {plusOneDishVariantToCart, minusOneDishVariantToCart} from '../reducers/cart/cartActions';
import {getTotal, getTotalItems, submitCart} from '../reducers/cart/cartActions';
import {fetchRestaurant} from '../reducers/restaurant/restaurantActions';

import CartItem from '../containers/CartItem';

@connect((store) => {
    return {
        signedIn: store.session.jwt!=null,
        restaurantOrders: Object.values(store.cart.restaurant_orders),
        restaurants: store.restaurant.restaurants,
        inProgress: store.cart.inProgress,
        error: store.cart.error,
        total: getTotal(),
        totalItems: getTotalItems()
    }
})

export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (a,b)=>a!==b});
        this.state = {}
    }

    componentWillMount = () => { this.props.restaurantOrders.forEach(restaurantOrder=>this.props.dispatch(fetchRestaurant(restaurantOrder.restaurant_id))); };

    handleAddToCart = (orderItem, restaurantId) => { this.props.dispatch(plusOneDishVariantToCart(orderItem, restaurantId)); };
    handleRemoveFromCart = (orderItem, restaurantId) => { this.props.dispatch(minusOneDishVariantToCart(orderItem, restaurantId)); };

    render() {
        return (
            <View style={s.parent}>
                <View style={s.titleBar}>
                    <View style={s.titleWrapper}>
                        <MaterialIcon style={s.cartIcon} name={"shopping-cart"} size={20} color={"#e16800"}/>
                        <Text style={s.title}>Cart</Text>
                    </View>
                </View>
                { this.props.inProgress && <Loading/> }
                {
                    this.props.restaurantOrders.length===0 &&
                    <View style={s.noItemsInCart}>
                        <Icon name={"frown-o"} size={100} color={"#e16800"}/>
                        <Text style={s.cartIsEmpty}>Your cart is empty</Text>
                        <Text style={s.shouldntBe}>but it shouldn't be</Text>
                    </View>
                }
                {
                    this.props.restaurantOrders.length>0 &&
                    <ListView style={s.scrollableArea}
                              dataSource={this.ds.cloneWithRows(this.props.restaurantOrders)}
                              enableEmptySections={true}
                              renderRow={restaurantOrder=>{
                                  return (
                                      <View key={restaurantOrder.restaurant_id}>
                                          <View style={s.restaurantWrapper}>
                                              <Icon name={"angle-right"} size={20} color={"#e16800"}/>
                                              <Text style={s.restaurantName}>{this.props.restaurants[restaurantOrder.restaurant_id]
                                                        ?this.props.restaurants[restaurantOrder.restaurant_id].name
                                                        :"Loading"}</Text>
                                          </View>
                                          <View>
                                          {
                                              restaurantOrder.order_items.map((orderItem, index) => {
                                                  return <CartItem
                                                      key={index}
                                                      addToCart={()=>this.handleAddToCart(orderItem, restaurantOrder.restaurant_id)}
                                                      removeFromCart={()=>this.handleRemoveFromCart(orderItem, restaurantOrder.restaurant_id)}
                                                      orderItem={orderItem}/>
                                              })
                                          }
                                          </View>
                                      </View>
                                  )
                              } }>
                    </ListView>
                }
                {
                    this.props.restaurantOrders.length>0 &&
                    <TouchableOpacity
                        style={s.touchableBottomBar}
                        onPress={()=>this.props.dispatch(submitCart())}>
                        <View style={s.proceedButton}>
                            <View style={s.totalWrapper}>
                                <Text style={s.total}> ₹ { this.props.total } </Text>
                                <Text style={s.totalItems}> { this.props.totalItems } {this.props.totalItems>1?"items":"item"} </Text>
                            </View>
                            <View style={s.line} />
                            <View style={s.buttonRight}>
                                <View style={s.proceedWrapper}>
                                    <Text style={s.proceed}> Proceed </Text>
                                    <Text style={s.toPay}> TO PAY </Text>
                                </View>
                                <Icon name={"chevron-circle-right"} size={20} color={"#F37521"}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        flex: 1,
        marginBottom: 80
    },
    titleBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#EEE',
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: { fontSize: 20 },
    cartIcon: { marginRight: 5 },
    scrollableArea: {
        flex: 1,
        padding: 10
    },
    restaurantWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    restaurantName: {
        padding: 10,
        fontSize: 20
    },
    touchableBottomBar: {
        height: 70,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderTopColor: '#BBB',
        borderTopWidth: 1
    },
    proceedButton: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    buttonRight: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    totalWrapper: {
        flex: 2,
        alignItems: 'center'
    },
    proceedWrapper: { paddingRight: 10 },
    proceed: { fontSize: 14 },
    toPay: { fontSize: 16 },
    total: { fontSize: 17 },
    totalItems: { fontSize: 13 },
    line: {
        width: 1,
        height: 50,
        backgroundColor: '#BBB'
    },
    noItemsInCart: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    cartIsEmpty: {
        fontSize: 15,
        marginTop: 20
    },
    shouldntBe: {
        fontSize: 17,
        padding: 5
    }
});
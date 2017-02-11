import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import Loading from '../views/Loading';

import {plusOneDishVariantToCart, minusOneDishVariantToCart} from '../reducers/cart/cartActions'
import {getTotal, getTotalItems, submitCart} from '../reducers/cart/cartActions'

import CartDishVariant from '../containers/CartDishVariant';

@connect((store) => {
    return {
        signedIn: store.session.jwt!=null,
        cartDishVariants: store.cart.dishVariants,
        dishVariants: store.dishVariant.dishVariants,
        dishes: store.dish.dishes,
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
        this.state = {}
    }

    handleAddToCart = (cartDishVariant) => { this.props.dispatch(plusOneDishVariantToCart(cartDishVariant)); };
    handleRemoveFromCart = (cartDishVariant) => { this.props.dispatch(minusOneDishVariantToCart(cartDishVariant)); };

    getDishVariant = (dishVariantId) => { return this.props.dishVariants[dishVariantId] };
    getDish = (dishVariantId) => { return this.getDishVariant(dishVariantId)? this.props.dishes[this.getDishVariant(dishVariantId).dish_id] : null };
    getRestaurant = (dishVariantId) => { return this.getDish(dishVariantId)? this.props.restaurants[this.getDish(dishVariantId).restaurant_id] : null };

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress && <Loading/> }
                <ScrollView style={s.scrollableArea}>
                    <View>
                        { this.props.cartDishVariants.map((cartDishVariant,index) => {
                            return <CartDishVariant
                                key={index}
                                addToCart={()=>this.handleAddToCart(cartDishVariant)}
                                removeFromCart={()=>this.handleRemoveFromCart(cartDishVariant)}
                                cartDishVariant={cartDishVariant}
                                dishVariant={this.getDishVariant(cartDishVariant.id)}
                                dish={this.getDish(cartDishVariant.id)}
                                restaurant={this.getRestaurant(cartDishVariant.id)}/>
                        }) }
                    </View>
                </ScrollView>
                {
                    this.props.cartDishVariants.length>0 &&
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
                                    <Text style={s.prooeed}> Proceed </Text>
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
    scrollableArea: {
        flex: 1,
        padding: 10
    },
    touchableBottomBar: {
        height: 70,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderTopColor: '#666',
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
    proceed: { fontSize: 17 },
    toPay: { fontSize: 16 },
    total: { fontSize: 17 },
    totalItems: { fontSize: 13 },
    line: {
        width: 1,
        height: 50,
        backgroundColor: '#666'
    }
});
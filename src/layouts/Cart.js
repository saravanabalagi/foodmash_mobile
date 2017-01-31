import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {plusOneDishVariantToCart, minusOneDishVariantToCart} from '../reducers/cart/cartActions'
import {getTotal, getTotalItems} from '../reducers/cart/cartActions'

import CartDishVariant from '../views/CartDishVariant';

@connect((store) => {
    return {
        signedIn: store.user.session.jwt!=null,
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

    handleAddToCart = (variantId) => { this.props.dispatch(plusOneDishVariantToCart({id: variantId, ordered:{}})) };
    handleRemoveFromCart = (variantId) => { this.props.dispatch(minusOneDishVariantToCart({id: variantId, ordered:{}})) };

    getDishVariant = (dishVariantId) => { return this.props.dishVariants[dishVariantId] };
    getDish = (dishVariantId) => { return this.getDishVariant(dishVariantId)? this.props.dishes[this.getDishVariant(dishVariantId).dish_id] : null };
    getRestaurant = (dishVariantId) => { return this.getDish(dishVariantId)? this.props.restaurants[this.getDish(dishVariantId).restaurant_id] : null };

    render() {
        return (
            <ScrollView style={s.parent}>
                <View>
                    { this.props.inProgress && <Text> inProgress </Text> }
                    { this.props.cartDishVariants.map(dishVariant => {
                        return <CartDishVariant
                            key={dishVariant.id}
                            addToCart={this.handleAddToCart}
                            removeFromCart={this.handleRemoveFromCart}
                            cartDishVariant={dishVariant}
                            dishVariant={this.getDishVariant(dishVariant.id)}
                            dish={this.getDish(dishVariant.id)}
                            restaurant={this.getRestaurant(dishVariant.id)}
                        />
                    }) }
                    <Text> Total: { this.props.total } </Text>
                    <Text> Items: { this.props.totalItems } </Text>
                    {
                        this.props.cartDishVariants.length>0 &&
                        <TouchableHighlight style={s.button} onPress={Actions.chooseAddress}>
                            <Text> { this.props.signedIn? "Proceed" : "Login" } </Text>
                        </TouchableHighlight>
                    }
                    { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
                </View>
            </ScrollView>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        padding: 10,
        marginBottom: 80
    },
    variant: {
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: '#ccf'
    },
    button: {
        padding: 10,
        backgroundColor: '#C88',
        margin: 10
    }
});
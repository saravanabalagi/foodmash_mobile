import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {plusOneDishVariantToCart, minusOneDishVariantToCart} from '../reducers/cart/cartActions'

import CartDishVariant from '../views/CartDishVariant';

@connect((store) => {
    return {
        signedIn: store.user.session.jwt!=null,
        dishCategories: store.dishCategory.dishCategories,
        dishVariants: store.cart.dish_variants,
        combos: store.cart.combos,
        inProgress: store.cart.inProgress,
        error: store.cart.error,
    }
})

export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleSubmitCart = () => { this.props.dispatch(submitCart()); };
    handleAddToCart = (variant_id, dish_id, dish_category_id) => { this.props.dispatch(plusOneDishVariantToCart({id: variant_id, dish_id: dish_id, dish_category_id: dish_category_id, ordered:{}})) };
    handleRemoveFromCart = (variant_id, dish_id, dish_category_id) => { this.props.dispatch(minusOneDishVariantToCart({id: variant_id, dish_id: dish_id, dish_category_id: dish_category_id, ordered:{}})) };

    getDishCategory = (dish_category_id) => { return this.props.dishCategories.filter(dishCategory => dishCategory.id === dish_category_id)[0] };
    getDish = (dish_id, dishCategory) => { return dishCategory.dishes.filter(dish => dish.id === dish_id)[0] };
    getDishVariant = (dish_variant_id, dish) => { return dish.dish_variants.filter(dish_variant => dish_variant.id === dish_variant_id)[0] };

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress && <Text> inProgress </Text> }
                { this.props.dishVariants.map(dish_variant => {
                    return <CartDishVariant
                        key={dish_variant.id}
                        addToCart={this.handleAddToCart}
                        removeFromCart={this.handleRemoveFromCart}
                        cart_dish_variant={dish_variant}
                        dish_variant={this.getDishVariant(dish_variant.id, this.getDish(dish_variant.dish_id, this.getDishCategory(dish_variant.dish_category_id)))}
                        dish={this.getDish(dish_variant.dish_id, this.getDishCategory(dish_variant.dish_category_id))}
                        dish_category={this.getDishCategory(dish_variant.dish_category_id)} />
                }) }
                {
                    this.props.dishVariants.length>0 &&
                    <TouchableHighlight style={s.button} onPress={Actions.chooseAddress}>
                        <Text> { this.props.signedIn? "Proceed" : "Login" } </Text>
                    </TouchableHighlight>
                }
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        padding: 20
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
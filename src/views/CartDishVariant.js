import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

import {Actions} from 'react-native-router-flux'

class CartDishVariant extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.parent}>
                <Text> Variant ID: {this.props.dish_variant.id}, Price: {this.props.dish_variant.price} </Text>
                <Text> Dish: {this.props.dish.name} </Text>
                <Text> Category: {this.props.dish_category.name} </Text>
                <Text> Quantity: {this.props.cart_dish_variant.quantity} </Text>
                <Text> Ordered: {JSON.stringify(this.props.cart_dish_variant.ordered)} </Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight
                        onPress={() => this.props.addToCart(this.props.dish_variant.id, this.props.dish_variant.dish_id, this.props.dish_variant.dish_category_id)}
                        underlayColor={'#000'}
                        style={s.addToCart} >
                        <Text>Add to Cart</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.props.removeFromCart(this.props.dish_variant.id, this.props.dish_variant.dish_id, this.props.dish_variant.dish_category_id)}
                        underlayColor={'#000'}
                        style={s.addToCart} >
                        <Text>Remove from Cart</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );

    }

}

const s = StyleSheet.create({
    parent: {
        padding: 20,
        backgroundColor: '#CCC',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 10
    },
    addToCart: {
        padding: 10,
        backgroundColor: '#C88',
        margin: 10
    }
});

export default CartDishVariant;
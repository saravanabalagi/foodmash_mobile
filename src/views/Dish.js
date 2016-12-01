import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

import {Actions} from 'react-native-router-flux'

class Dish extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.parent}>
                { this.props.dish.inProgress && <Text> inProgress </Text> }
                <Text> { this.props.dish.name } </Text>
                <Text> Restaurant: { this.props.dish.restaurant.name } </Text>
                { this.props.dish.dish_variants.map(variant => {
                    return (
                        <View key={variant.id} style={s.variant}>
                            <Text> Variant ID: {variant.id} </Text>
                            <Text> Rs. {variant.price} </Text>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableHighlight
                                    onPress={() => this.props.addToCart(variant.id, this.props.dish.id, this.props.category_id)}
                                    underlayColor={'#000'}
                                    style={s.addToCart} >
                                    <Text>Add to Cart</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={() => this.props.removeFromCart(variant.id, this.props.dish.id, this.props.category_id)}
                                    underlayColor={'#000'}
                                    style={s.addToCart} >
                                    <Text>Remove from Cart</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    )
                }) }
                { this.props.dish && this.props.dish.error != null && !this.props.dish.inProgress && <Text> {this.props.dish.error.toString()} </Text> }
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
    },
    variant: {
        padding: 20
    }
});

export default Dish;
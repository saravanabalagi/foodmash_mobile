import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

import {Actions} from 'react-native-router-flux';
import DishVariant from './DishVariant';

class Dish extends React.Component {

    constructor(props) {
        super(props);
    }

    handleAddToCart = (dish_variant_id) => {this.props.addToCart(dish_variant_id, this.props.dish.id, this.props.category_id)};
    handleRemoveFromCart = (dish_variant_id) => {this.props.removeFromCart(dish_variant_id, this.props.dish.id, this.props.category_id)};

    render() {
        return (
            <View style={s.parent}>
                { this.props.dish.inProgress && <Text> inProgress </Text> }
                <Text> { this.props.dish.name } </Text>
                <Text> Restaurant: { this.props.dish.restaurant.name } </Text>
                { this.props.dish.dish_variants.map((dish_variant,index) => {
                    return (
                        <DishVariant key={dish_variant.id} dish_variant={dish_variant} index={index}
                              addToCart={this.handleAddToCart} removeFromCart={this.handleRemoveFromCart} />
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
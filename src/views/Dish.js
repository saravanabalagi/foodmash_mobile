import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

import {Actions} from 'react-native-router-flux'

class DishMini extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.parent}>
                { this.props.dish.inProgress && <Text> inProgress </Text> }
                <Text> { this.props.dish.name } </Text>
                <Text> { this.props.dish.restaurant.name } </Text>
                <Text> { this.props.dish.price } </Text>
                { this.props.dish.dish_variants.map(variant => {
                    return (
                        <View key={variant.id}>
                            <Text> {variant.id} </Text>
                            <Text> {variant.price} </Text>
                            <TouchableHighlight
                                onPress={() => this.props.addToCart(variant.id, this.props.dish.id, this.props.category_id)}
                                underlayColor={'#000'}
                                style={s.addToCart} >
                                <Text>Add to Cart</Text>
                            </TouchableHighlight>
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
    }
});

export default DishMini;
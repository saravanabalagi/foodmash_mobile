import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

import {Actions} from 'react-native-router-flux'

class DishVariant extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View key={this.props.dish_variant.id} style={s.variant}>
                <Text> Variant: {this.props.dish_variant.variant.display_name}</Text>
                <Text> Rs. {this.props.dish_variant.price} </Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight
                        onPress={() => this.props.addToCart(this.props.dish_variant.id)}
                        underlayColor={'#000'}
                        style={s.addToCart} >
                        <Text>Add to Cart</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.props.removeFromCart(this.props.dish_variant.id)}
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
        padding: 20
    },
    addToCart: {
        padding: 10,
        backgroundColor: '#C88',
        margin: 10
    }
});

export default DishVariant;
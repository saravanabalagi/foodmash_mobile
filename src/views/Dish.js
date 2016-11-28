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
            <TouchableHighlight
                onPress={() => Actions.viewDish({id: this.props.dish.id})}
                style={s.parent}>
                <View>
                    <Text> { this.props.dish.name } </Text>
                    <Text> { this.props.dish.restaurant.name } </Text>
                    <Text> { this.props.dish.price } </Text>
                </View>
            </TouchableHighlight>
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
    }
});

export default Dish;
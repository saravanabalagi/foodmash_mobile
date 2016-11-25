import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

class Dish extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.parent}>
                <Text> { this.props.dish.id } </Text>
                <Text> { this.props.dish.name } </Text>
            </View>
        );

    }

}

const s = StyleSheet.create({

});

export default Dish;
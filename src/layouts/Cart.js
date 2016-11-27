import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';

export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={s.parent}>
                <Text>This is cart page</Text>
                <Button onPress={Actions.orders}>Click me for Orders</Button>
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        paddingTop: 50
    }
});
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';

export default class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={{paddingTop: 50}}>
                <Text>This is orders page</Text>
                <Button onPress={Actions.login}>Click me for Login</Button>
            </View>
        );
    }

}

// const s = StyleSheet.create({
//
// });
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Button from 'react-native-button';
import LoginForm from '../containers/LoginForm';
import {Actions} from 'react-native-router-flux';

export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={{flex:1}}>
                <LoginForm />
            </View>
        );
    }

}

// const s = StyleSheet.create({
//
// });
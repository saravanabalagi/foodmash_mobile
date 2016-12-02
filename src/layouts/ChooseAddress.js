import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {chooseAddressForCart} from '../reducers/cart/cartActions'

import ManageAddresses from '../layouts/ManageAddresses';
import LoginForm from '../containers/LoginForm';

@connect((store) => {
    return {
        signedIn: store.user.session.jwt!=null
    }
})

export default class ChooseAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChooseAddress = (address_id) => { this.props.dispatch(chooseAddressForCart(address_id)); };

    render() {
        return (
            <View style={s.parent}>
                { !this.props.signedIn && <LoginForm /> }
                { this.props.signedIn && <ManageAddresses chooseAddress={this.handleChooseAddress} /> }
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        flex: 1
    },
    button: {
        padding: 10,
        backgroundColor: '#C88',
        margin: 10
    }
});
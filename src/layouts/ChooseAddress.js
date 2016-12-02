import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {chooseAddressForCart, submitCart, setAddress} from '../reducers/cart/cartActions'

import ManageAddresses from '../layouts/ManageAddresses';
import LoginForm from '../containers/LoginForm';

@connect((store) => {
    return {
        signedIn: store.user.session.jwt!=null,
        selectedAddress: store.cart.address_id
    }
})

export default class ChooseAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChooseAddress = (address_id) => { this.props.dispatch(chooseAddressForCart(address_id)); };
    handleSubmitCart = () => {
        this.props.dispatch(submitCart());
        this.props.dispatch(setAddress(this.props.selectedAddress));
    };

    render() {
        return (
            <View style={s.parent}>
                { !this.props.signedIn && <LoginForm /> }
                { this.props.signedIn && !this.props.selectedAddress &&<Text>Select an address to continue</Text> }
                { this.props.signedIn && <ManageAddresses chooseAddress={this.handleChooseAddress} /> }
                { this.props.signedIn &&
                    <View style={{flexDirection: 'row'}}>
                        <TouchableHighlight
                            style={s.button}
                            onPress={Actions.pop}>
                            <Text>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={this.proceedButtonStyle()}
                            onPress={this.handleSubmitCart}>
                            <Text>Proceed</Text>
                        </TouchableHighlight>
                    </View>
                }
            </View>
        );
    }

    proceedButtonStyle = () => {
        return {
            flex: 1,
            padding: 10,
            backgroundColor: this.props.selectedAddress? '#C88': '#777',
            margin: 10
        }
    }

}

const s = StyleSheet.create({
    parent: {
        flex: 1
    },
    button: {
        flex: 1,
        padding: 10,
        backgroundColor: '#C88',
        margin: 10
    }
});
import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet
} from 'react-native'
import {connect} from 'react-redux';
import {fetchAddresses} from '../reducers/address/addressActions';

@connect((store) => {
    return {
        addresses: store.address.addresses,
        inProgress: store.address.inProgress,
        error: store.address.error
    };
})

class ChooseLocation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = () => {
        this.props.dispatch(fetchJwt({
            email: this.state.email,
            password: this.state.password
        }));
    };

    render() {
        return (
            <View style={s.parent}>
                <Text> Addresses </Text>
                <TouchableHighlight
                    style={s.button}
                    underlayColor={'#777777'}
                    disabled={this.props.inProgress}
                    onPress={() => this.handleSubmit()}>
                    <Text style={s.buttonText}> {this.props.inProgress===true? "Logging In":"Log In"} </Text>
                </TouchableHighlight>
                { this.props.addresses != null && !this.props.inProgress && <Text> {this.props.addresses} </Text> }
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
            </View>
        );

    }

}

const s = StyleSheet.create({

});

export default ChooseLocation;
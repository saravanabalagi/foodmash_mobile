import React from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    StyleSheet
} from 'react-native'

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import Address from '../views/Address';
import {fetchAddresses} from '../reducers/user/userActions';

@connect((store) => {
    return {
        addresses: store.user.addresses.addresses,
        inProgress: store.user.addresses.inProgress,
        error: store.user.addresses.error
    };
})

class ManageAddresses extends React.Component {

    constructor(props) { super(props); }

    componentDidMount = () => { console.log("Props: ",this.props); if (this.props.addresses.length === 0) this.props.dispatch(fetchAddresses()); };

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress && <Text> inProgress </Text> }
                { this.props.addresses.map((address) => { return <Address key={address.id} address={address} /> }) }
                <TouchableHighlight style={s.button} onPress={Actions.pop}>
                    <Text>Back to Profile</Text>
                </TouchableHighlight>
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
            </View>
        );

    }

}

const s = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: '#C88',
        margin: 10
    }
});

export default ManageAddresses;
import React from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    StyleSheet,
    ScrollView
} from 'react-native'

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import Address from '../views/Address';
import {fetchAddresses} from '../reducers/address/addressActions';

@connect((store) => {
    return {
        addresses: store.address.addresses,
        inProgress: store.address.inProgress,
        error: store.address.error,
        selectedAddressId: store.cart.address_id
    };
})

class ManageAddresses extends React.Component {

    constructor(props) { super(props); }

    componentDidMount = () => { if (this.props.addresses.length === 0) this.props.dispatch(fetchAddresses()); };
    handleEdit = () => { if(this.props.chooseAddress) Actions.editAddressOnChoose(); else Actions.editAddress(); };

    render() {
        return (
            <ScrollView style={s.parent}>
                { this.props.inProgress && <Text> inProgress </Text> }
                {
                    this.props.addresses.map((address) => {
                    let selectable =
                    <TouchableHighlight
                        key={address.id}
                        style={this.selectedAddressStyle(address.id)}
                        onPress={() => this.props.chooseAddress(address.id)}>
                        <View><Address inCart={true} address={address}/></View>
                    </TouchableHighlight>;
                    let normal = <Address key={address.id} address={address} />;
                    return ( this.props.chooseAddress? selectable: normal )})
                }
                <TouchableHighlight style={s.button} onPress={this.handleEdit}>
                    <Text>Add Address</Text>
                </TouchableHighlight>
                { !this.props.chooseAddress && <TouchableHighlight style={s.button} onPress={Actions.pop}><Text>Back to Profile</Text></TouchableHighlight> }
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
            </ScrollView>
        );

    }

    selectedAddressStyle = (address_id) => {
        const selected = (this.props.selectedAddressId === address_id );
        return { backgroundColor: selected? '#afa': '#ddd', margin: 10 }
    };

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

export default ManageAddresses;
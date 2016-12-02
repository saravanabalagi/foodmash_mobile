import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {deleteAddress} from '../reducers/address/addressActions'

@connect((store) => {
    return {

    };
})

class Address extends React.Component {

    constructor(props) {
        super(props);
    }

    handleDelete = () => {this.props.dispatch(deleteAddress(this.props.address.id))};

    render() {
        return (
            <View style={s.parent}>
                <Text> { this.props.address.name } </Text>
                <Text> { this.props.address.line1 } </Text>
                <Text> { this.props.address.line2 } </Text>
                <Text> { this.props.address.location.name } </Text>
                <Text> { this.props.address.mobile } </Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight style={s.button} onPress={Actions.pop}>
                        <Text>Edit</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={s.button} onPress={this.handleDelete}>
                        <Text>Delete</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        margin: 10,
        padding: 20,
        backgroundColor: '#aaf'
    },
    button: {
        padding: 10,
        backgroundColor: '#C88',
        margin: 10
    }
});

export default Address;
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {fetchUser} from '../reducers/user/userActions';

@connect((store) => {
    return {
        name: store.user.name,
        email: store.user.email,
        mobile: store.user.mobile,
        location: store.location.locations[store.user.locationId],
        inProgress: store.user.inProgress,
        error: store.user.error
    }
})

export default class UserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount = () => { if(!this.props.name) this.props.dispatch(fetchUser()); };

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress && <Text> inProgress </Text> }
                <Text> Name: {this.props.name} </Text>
                <Text> Email: {this.props.email} </Text>
                <Text> Mobile: {this.props.mobile} </Text>
                <Text> Location: {(this.props.location) ? this.props.location.name : "Loading"} </Text>
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        padding: 30,
        backgroundColor: '#ccf'
    },
    button: {
        padding: 10,
        backgroundColor: '#C88',
        margin: 10
    }
});
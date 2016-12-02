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
        inProgress: store.user.inProgress,
        error: store.user.error
    }
})

export default class UserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = () => { if(!this.props.name) this.props.dispatch(fetchUser()); };

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress && <Text> inProgress </Text> }
                <Text> Name: {this.props.name} </Text>
                <Text> Email: {this.props.email} </Text>
                <Text> Mobile: {this.props.mobile} </Text>
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        padding: 30,
        backgroundColor: '#ccf'
    }
});
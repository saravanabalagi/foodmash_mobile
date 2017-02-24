import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import UserDetails from '../../containers/UserDetails';
import {connect} from 'react-redux';

@connect((store) => {
    return {
        signedIn: store.session.jwt!=null
    }
})

export default class ViewAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    // componentWillMount = () => { if(!this.props.signedIn) Actions.account() };

    render() {
        return (
            <View style={s.parent}>
                { this.props.signedIn && <UserDetails /> }
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        flex: 1,
        marginBottom: 80
    }
});
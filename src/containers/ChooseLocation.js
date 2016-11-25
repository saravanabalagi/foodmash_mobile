import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet
} from 'react-native'
import {connect} from 'react-redux';
import {fetchJwt} from '../reducers/user/userActions';

@connect((store) => {
    return {
        selected: store.location.selected,
        locations: store.location.locations,
        inProgress: store.location.inProgress,
        error: store.location.error
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
                <Text> Email </Text>
                <TouchableHighlight
                    style={s.button}
                    underlayColor={'#777777'}
                    disabled={this.props.inProgress}
                    onPress={() => this.handleSubmit()}>
                    <Text style={s.buttonText}> {this.props.inProgress===true? "Logging In":"Log In"} </Text>
                </TouchableHighlight>
                { this.props.locations != null && !this.props.inProgress && <Text> {this.props.locations} </Text> }
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
            </View>
        );

    }

}

const s = StyleSheet.create({

});

export default ChooseLocation;
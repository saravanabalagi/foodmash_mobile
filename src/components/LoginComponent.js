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
        jwt: store.user.jwt,
        processing: store.user.processing,
        error: store.user.error
    };
})

class Login extends React.Component {

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
                <TextInput
                    style={s.inputFields}
                    onChangeText={(text) => this.setState({email:text}) }/>
                <Text> Password </Text>
                <TextInput
                    style={s.inputFields}
                    onChangeText={(text) => this.setState({password:text})} />
                <TouchableHighlight
                    style={s.button}
                    underlayColor={'#777777'}
                    onPress={() => this.handleSubmit()}>
                    <Text style={s.buttonText}> Login </Text>
                </TouchableHighlight>
                { this.props.jwt != null && !this.props.processing && <Text> {this.props.jwt} </Text> }
                { this.props.error != null && !this.props.processing && <Text> {this.props.error.toString()} </Text> }
            </View>
        );

    }

}

const s = StyleSheet.create({
    parent: {
        padding: 20,
        alignSelf: 'stretch'
    },
    inputFields: {
        alignSelf: 'stretch'
    },
    button: {
        margin: 10,
        padding: 10,
        backgroundColor: '#AA0000',
        borderRadius: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    }
});

export default Login;
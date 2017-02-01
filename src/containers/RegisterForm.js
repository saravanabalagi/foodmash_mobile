import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet
} from 'react-native'

import {connect} from 'react-redux';
import {signupUser} from '../reducers/session/sessionActions';

import Icon from 'react-native-vector-icons/FontAwesome';

@connect((store) => {
    return {
        accessToken: store.session.oauth,
        inProgress: store.session.inProgress,
        error: store.session.error
    };
})

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            mobile: '',
            password: ''
        };
    }

    handleSubmit = () => {
        this.props.dispatch(signupUser({
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            password: this.state.password
        }));
    };

    render() {
        return (
            <View style={s.parent}>
                <View style={s.inputParent}>
                    <Icon name='user' size={24} color={'red'}/>
                    <TextInput
                        style={s.inputFields}
                        onChangeText={(text) => this.setState({name:text}) }/>
                </View>
                <View style={s.inputParent}>
                    <Icon name='phone' size={24} color={'red'}/>
                    <TextInput
                        style={s.inputFields}
                        onChangeText={(text) => this.setState({mobile:text})} />
                </View>
                <View style={s.inputParent}>
                    <Icon name='envelope' size={24} color={'red'}/>
                    <TextInput editable={false} value='+91' />
                    <TextInput
                        style={s.inputFields}
                        onChangeText={(text) => this.setState({email:text}) }/>
                </View>
                {
                    this.props.accessToken!=null &&
                    <View style={s.inputParent}>
                        <Icon name='key' size={24} color={'red'}/>
                        <TextInput
                            style={s.inputFields}
                            onChangeText={(text) => this.setState({password:text})} />
                    </View>
                }
                <View style={s.inputParent}>
                    <Text>I accept terms and conditions</Text>
                </View>
                <View style={s.inputParent}>
                    <TouchableHighlight
                        style={s.signupButton}
                        underlayColor={'#777777'}
                        onPress={() => this.handleSubmit()}>
                        <Text style={s.buttonText}> Sign Up </Text>
                    </TouchableHighlight>
                </View>
                <View style={s.inputParent}>
                    <Text> Forgot Password? </Text>
                </View>
                <View style={s.inputParent}>
                    <View style={s.line} />
                    <Text> or login using </Text>
                    <View style={s.line} />
                </View>
                <View style={}>
                    <Icon name='facebook-square' size={45} color={'blue'} />
                </View>

                { this.props.jwt != null && !this.props.inProgress && <Text> {this.props.jwt} </Text> }
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
            </View>
        );

    }

}

const s = StyleSheet.create({
    parent: {
        padding: 20,
        alignSelf: 'stretch'
    },
    inputParent: {
        flex: 1,
        flexDirection: 'row'
    },
    inputFields: {
        alignSelf: 'stretch'
    },
    signupButton: {
        margin: 10,
        padding: 10,
        backgroundColor: '#AA0000',
        borderRadius: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    line: {
        flex: 1,
        color: '#000',
        height: 1
    }
});

const loginButtonStyle = () => {
    return {
        margin: 10,
        padding: 10,
        backgroundColor: this.props.inProgress ?'#777777'  :'#AA0000',
        borderRadius: 10
    }
};

export default RegisterForm;
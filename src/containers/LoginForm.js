import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import {connect} from 'react-redux';
import {fetchJwt} from '../reducers/session/sessionActions';
import {fetchUser} from '../reducers/user/userActions';

import {ActionConst, Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

@connect((store) => {
    return {
        user: store.user.user,
        jwt: store.session.jwt,
        inProgress: store.session.inProgress,
        error: store.session.error
    };
})

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shouldRedirect: false,
            email: "",
            password: "",
            secureText: true
        };
    }

    componentWillMount = () => { this.checkAndRedirect(this.props.jwt, this.props.user) };
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.jwt!=null && this.props.jwt!=nextProps.jwt) this.props.dispatch(fetchUser());
        if(this.state.shouldRedirect && this.props.user != nextProps.user) this.checkAndRedirect(nextProps.jwt, nextProps.user);
    };

    checkAndRedirect = (jwt, user) => {
        if(jwt!=null && user.mobile!=null)
            if(user.roles.some(role=>role.name=="restaurant_admin"))
                this.setState({shouldRedirect:false},()=>{ this.props.createCable(jwt); Actions.vendorApp(); });
            else this.setState({shouldRedirect:false},()=>{ this.props.createCable(jwt); Actions.app(); });
    };

    handleSubmit = () => {
        this.setState({shouldRedirect: true},
            ()=>{ this.props.dispatch(fetchJwt({
                    email: this.state.email,
                    password: this.state.password
                }));
            });
    };

    render() {
        return (
            <View style={s.parent}>
                <View style={[s.row, s.inputParent]}>
                    <Icon style={s.inputIcon} name='user' size={30} color={'#CC0000'} />
                    <TextInput
                        placeholder='Phone number or Email address'
                        value={this.state.email}
                        style={s.inputFields}
                        onChangeText={(text) => this.setState({email:text}) }/>
                </View>
                <View style={[s.row, s.inputParent]}>
                    <Icon style={s.inputIcon} name='unlock' size={30} color={'#CC0000'}/>
                    <TextInput
                        placeholder='Password'
                        value={this.state.password}
                        style={s.inputFields}
                        secureTextEntry={this.state.secureText}
                        onChangeText={(text) => this.setState({password:text})} />
                    <Icon onPress={() => this.setState({secureText:!this.state.secureText})}
                        name={this.state.secureText? 'eye-slash': 'eye'} size={24} color={'black'}/>
                </View>
                <View style={s.row}>
                    <TouchableHighlight
                        style={this.signinButtonStyle()}
                        underlayColor={'#777777'}
                        disabled={this.props.inProgress}
                        onPress={() => this.handleSubmit()}>
                        <Text style={s.buttonText}> {this.props.inProgress===true? "Logging In":"Log In"} </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={s.signupButton}
                        underlayColor={'#777777'}
                        onPress={() => this.handleSubmit()}>
                        <Text style={s.buttonText}> Create New Account </Text>
                    </TouchableHighlight>
                </View>
                <View style={[s.row, s.lineRow]}>
                    <View style={s.line} />
                    <Text style={s.loginUsingText}> or login using </Text>
                    <View style={s.line} />
                </View>
                <View style={s.row}>
                    <Icon name='facebook-square' size={70} color={'blue'} />
                </View>

                { this.props.jwt != null && !this.props.inProgress && <Text> {this.props.jwt} </Text> }
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
            </View>
        );

    }

    signinButtonStyle = () => {
        return {
            margin: 10,
            padding: 10,
            backgroundColor: this.props.inProgress ?'#777777'  :'#CC0000',
            borderRadius: 10
        }
    };

}

const s = StyleSheet.create({
    parent: {
        flex: 1,
        padding: 30,
        backgroundColor: '#FFF'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputParent: {
        marginTop: 10,
        marginBottom: 10,
        height: 50
    },
    inputFields: {
        flex: 1
    },
    inputIcon: {
        width: 40
    },
    signupButton: {
        margin: 10,
        padding: 10,
        backgroundColor: '#CC0000',
        borderRadius: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    lineRow: {
      padding: 20
    },
    line: {
        flex: 1,
        backgroundColor: '#000',
        height: 1,
        marginTop: 5
    },
    loginUsingText: {
        fontSize: 15
    }
});

export default LoginForm;
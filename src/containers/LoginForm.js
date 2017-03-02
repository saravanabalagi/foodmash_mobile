import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';


import {connect} from 'react-redux';
import {fetchJwt, sendOauthToken} from '../reducers/session/sessionActions';
import {fetchUser} from '../reducers/user/userActions';

import {ActionConst, Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

@connect((store) => {
    return {
        oauthDetails: store.session.oauthDetails,
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
        if(this.state.shouldRedirect && nextProps.oauthDetails!=null && nextProps.oauthDetails!=this.props.oauthDetails && nextProps.jwt==null) this.setState({shouldRedirect:false},()=>Actions.signup());
    };

    checkAndRedirect = (jwt, user) => {
        if(this.state.shouldRedirect && jwt!=null && user.mobile!=null)
            if(user.roles.some(role=>role.name=="restaurant_admin"))
                this.setState({shouldRedirect:false},()=>{ this.props.createCable(jwt); Actions.vendorApp(); });
            else this.setState({shouldRedirect:false},()=>{ this.props.createCable(jwt); (this.props.user.location_id)?Actions.app():Actions.selectLocation(); });
    };

    handleReceivedAccessToken = (access_token, provider) => { this.props.dispatch(sendOauthToken(access_token, provider)); };
    handleFacebookLogin = () => {
        this.setState({shouldRedirect:true},
            ()=>LoginManager.logInWithReadPermissions(['public_profile']).then(result => {
                if(!result.isCancelled) AccessToken.getCurrentAccessToken().then((data)=>this.handleReceivedAccessToken(data.accessToken,"facebook"))
            },(error)=>(alert(error.toString()),console.log(error))));
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
                <View style={s.titleBar}>
                    <View style={{width:60}}/>
                    <View style={s.titleWrapper}>
                        <MaterialIcon style={s.loginIcon} name={"security"} size={20} color={"#e16800"}/>
                        <Text style={s.title}>Login</Text>
                    </View>
                    <View style={{width:60}}/>
                </View>
                <View style={s.mainView}>
                    <View style={s.inputWrapper}>
                        <View style={[s.row, s.inputParent]}>
                            <MaterialIcon style={s.inputIcon} name='perm-phone-msg' size={30} color={'#e16800'} />
                            <TextInput
                                placeholder='Phone number or Email address'
                                value={this.state.email}
                                style={s.inputFields}
                                onChangeText={(text) => this.setState({email:text}) }/>
                        </View>
                        <View style={[s.row, s.inputParent]}>
                            <MaterialIcon style={s.inputIcon} name='lock' size={30} color={'#e16800'}/>
                            <TextInput
                                placeholder='Password'
                                value={this.state.password}
                                style={s.inputFields}
                                secureTextEntry={this.state.secureText}
                                onChangeText={(text) => this.setState({password:text})} />
                            <MaterialIcon onPress={() => this.setState({secureText:!this.state.secureText})}
                                  name={this.state.secureText? 'visibility-off': 'visibility'} size={24} color={'black'}/>
                        </View>
                    </View>

                    {/*TODO: remove after debugging*/}
                    <View style={s.row}>
                        <TouchableHighlight
                            style={[s.button,s.setButton]}
                            underlayColor={'#777777'}
                            onPress={() => this.setState({email:"zekedran@hotmail.com",password:"12345678"})}>
                            <Text style={s.buttonText}> Customer </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[s.button,s.setButton]}
                            underlayColor={'#777777'}
                            onPress={() => this.setState({email:"restaurant@guy.com",password:"qwertyuiop"})}>
                            <Text style={s.buttonText}> RestaurantAdmin </Text>
                        </TouchableHighlight>
                    </View>


                    <View style={s.row}>
                        <TouchableHighlight
                            style={[s.button,this.signinButtonStyle()]}
                            underlayColor={'#777777'}
                            disabled={this.props.inProgress}
                            onPress={() => this.handleSubmit()}>
                            <Text style={s.buttonText}> {this.props.inProgress===true? "Logging In":"Log In"} </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={s.button}
                            underlayColor={'#777777'}
                            onPress={() => Actions.signup({emailBasedSignup: true})}>
                            <Text style={s.buttonText}> Create New Account </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[s.row, s.lineRow]}>
                        <View style={s.line} />
                        <Text style={s.loginUsingText}> or login using </Text>
                        <View style={s.line} />
                    </View>
                    <View style={s.oauthWrapper}>
                        <TouchableOpacity onPress={()=>this.handleFacebookLogin()}>
                            <Icon name='facebook-square' size={70} color={'#3b5998'} />
                        </TouchableOpacity>
                    </View>
                </View>
                { this.props.jwt != null && !this.props.inProgress && <Text> {this.props.jwt} </Text> }
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
            </View>
        );

    }

    signinButtonStyle = () => { return { backgroundColor: this.props.inProgress ?'#777777'  :'#e16800',} };

}

const s = StyleSheet.create({
    parent: { flex: 1 },

    titleBar: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EEE',
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: { fontSize: 20 },
    loginIcon: { marginRight:5 },

    inputWrapper: { padding: [20,30,10,30] },
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
    inputFields: { flex: 1},
    inputIcon: { width: 40},

    //TODO: remove after debugginh
    setButton: { backgroundColor: '#5fc8ee',},

    button: {
        margin: 10,
        padding: [10,20],
        backgroundColor: '#e16800',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },

    lineRow: { padding: 20},
    line: {
        flex: 1,
        backgroundColor: '#000',
        height: 1,
        marginTop: 5
    },
    loginUsingText: { fontSize: 15 },
    oauthWrapper: { alignItems: 'center' }
});

export default LoginForm;
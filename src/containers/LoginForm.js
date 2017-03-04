import React from 'react';
import {
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';


import {connect} from 'react-redux';
import {fetchJwt, sendOauthToken} from '../reducers/session/sessionActions';
import {fetchUser} from '../reducers/user/userActions';

import {getErrorDisplayString} from '../helpers/errorHelper';
import {ActionConst, Actions} from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SnackBar from 'react-native-snackbar-dialog';

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
            secureText: true,
            facebookLoading: ""
        };
    }

    componentWillMount = () => { this.checkAndRedirect(this.props.jwt, this.props.user) };
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.jwt!=null && this.props.jwt!=nextProps.jwt) this.props.dispatch(fetchUser());
        if(this.state.shouldRedirect && this.props.user != nextProps.user) this.checkAndRedirect(nextProps.jwt, nextProps.user);
        if(this.state.shouldRedirect && nextProps.oauthDetails!=null && nextProps.oauthDetails!=this.props.oauthDetails && nextProps.jwt==null) this.setState({shouldRedirect:false},()=>Actions.signup());
        if(this.props.error!=nextProps.error && nextProps!=null) SnackBar.show(this.getErrorString(nextProps.error), { confirmText:"Dismiss", onConfirm: ()=>SnackBar.dismiss()});
    };

    getErrorString = (error) => {
        if(error.response && error.response.status)
            if(parseInt(error.response.status)==404)
                return "Invalid email or password";
        else return getErrorString(error);
    };

    checkAndRedirect = (jwt, user) => {
        if(this.state.shouldRedirect && jwt!=null && user.mobile!=null)
            if(user.roles.some(role=>role.name=="restaurant_admin"))
                this.setState({shouldRedirect:false},()=>{ this.props.createCable(jwt); Actions.vendorApp(); });
            else this.setState({shouldRedirect:false},()=>{ this.props.createCable(jwt); (this.props.user.location_id)?Actions.app():Actions.selectLocation(); });
    };

    isInternetError = (error) => {
        let errorString = error.toString().replace(/_/g, " ").replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3').toLowerCase();
        let compareString = ["resolve host","connection exception","connection failure","connection error","unknown host"];
        return compareString.some(compareString=>errorString.includes(compareString.toLowerCase()));
    };
    handleReceivedAccessToken = (access_token, provider) => { this.setState({facebookLoading:"Logging in"},()=>this.props.dispatch(sendOauthToken(access_token, provider))); };
    handleFacebookLogin = () => {
        this.setState({facebookLoading:"Requesting",shouldRedirect:true},
            ()=>LoginManager.logInWithReadPermissions(['public_profile','email']).then(result => {
                if(result.isCancelled) this.setState({facebookLoading:"Cancelled",shouldRedirect:false});
                if(!result.isCancelled) this.setState({facebookLoading:"Loading"}, ()=>AccessToken.getCurrentAccessToken().then((data)=>this.handleReceivedAccessToken(data.accessToken,"facebook")));
            },(error)=>{console.log(error); this.setState({facebookLoading:(this.isInternetError(error))?"No Internet":"Error",shouldRedirect:false}); }));
    };


    handleSubmit = () => {
        Keyboard.dismiss();
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
                        <View style={s.oauthInstanceWrapper}>
                            <TouchableOpacity onPress={()=>this.handleFacebookLogin()}>
                                <Icon name='facebook-square' size={70} color={'#3b5998'} />
                            </TouchableOpacity>
                            { !!this.state.facebookLoading && <Text style={s.oauthLoading}>{ this.state.facebookLoading }</Text> }
                        </View>

                    </View>
                </View>
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

    //TODO: remove after debugging
    setButton: { backgroundColor: '#5fc8ee',},

    button: {
        margin: 5,
        padding: [10,15],
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
    oauthWrapper: { flexDirection:'row', justifyContent: 'center' },
    oauthInstanceWrapper: { alignItems: 'center' },
    oauthLoading: {
        margin: 5,
        padding: [5,10],
        fontSize: 10,
        borderRadius: 5,
        borderColor: '#EEE',
        borderWidth: 1,
        backgroundColor: '#F6F6F6'
    }
});

export default LoginForm;
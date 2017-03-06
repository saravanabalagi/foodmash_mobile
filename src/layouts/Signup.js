import React, {Component} from 'react';
import {
    View,
    Text,
    Keyboard,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {signupUser} from '../reducers/session/sessionActions';
import {fetchUser} from '../reducers/user/userActions';

import Loading from '../views/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {getErrorDisplayString} from '../helpers/errorHelper';
import SnackBar from 'react-native-snackbar-dialog';

@connect((store) => {
    return {
        jwt: store.session.jwt,
        user: store.user.user,
        name: store.session.oauthDetails?store.session.oauthDetails.name:null,
        email: store.session.oauthDetails?store.session.oauthDetails.email:null,
        inProgress: store.session.inProgress,
        error: store.session.error
    }
})

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name?this.props.name:"",
            email: this.props.email?this.props.email:"",
            mobile: "",
            password: "",
            secureText: true,
            shouldRedirect: false
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props.name!=nextProps.name) this.setState({name:nextProps.name});
        if(this.props.email!=nextProps.email) this.setState({email:nextProps.email});

        if(nextProps.jwt!=null && this.props.jwt!=nextProps.jwt) this.props.dispatch(fetchUser());
        if(this.state.shouldRedirect && nextProps.jwt!=null && nextProps.user.mobile!=null)
            if(nextProps.user.roles.some(role=>role.name=="restaurant_admin"))
                this.setState({shouldRedirect:false},()=>{ nextProps.createCable(nextProps.jwt); Actions.vendorApp(); });
            else this.setState({shouldRedirect:false},()=>{ nextProps.createCable(nextProps.jwt); (nextProps.user.location_id)?Actions.app():Actions.selectLocation(); });

        if(this.props.error!=nextProps.error && nextProps.error!=null)
            SnackBar.show(getErrorDisplayString(nextProps.error),
                { confirmText:"Dismiss", onConfirm: ()=>SnackBar.dismiss()});
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        this.setState({shouldRedirect:true},
            ()=>this.props.dispatch(
                    signupUser(
                        this.state.name,
                        this.state.email,
                        this.state.mobile,
                        this.state.password)));
    };

    render() {
        return (
            <View style={s.parent}>
                <View style={s.titleBar}>
                    <TouchableOpacity onPress={Actions.pop}><Icon style={s.backIcon} name={"angle-left"} size={25} color={"#000a74"}/></TouchableOpacity>
                    <View style={s.titleWrapper}>
                        <MaterialIcon style={s.signupIcon} name={"person-add"} size={20} color={"#e16800"}/>
                        <Text style={s.title}>Sign Up</Text>
                    </View>
                    <View style={{width:60}}/>
                </View>
                { this.props.inProgress && <Loading/> }
                <ScrollView
                    keyboardShouldPersistTaps={"always"}
                    style={s.scrollableArea}>
                    <View style={s.mainContent}>
                        <View style={[s.row, s.inputParent]}>
                            <MaterialIcon style={s.inputIcon} name='person' size={30} color={'#e16800'} />
                            <TextInput
                                placeholder='Name'
                                value={this.state.name}
                                autofocus={!this.props.name}
                                editable={!this.props.name}
                                style={s.inputFields}
                                onChangeText={(text) => this.setState({name:text}) }/>
                        </View>
                        <View style={[s.row, s.inputParent]}>
                            <MaterialIcon style={s.inputIcon} name='mail' size={30} color={'#e16800'} />
                            <TextInput
                                placeholder='Email address'
                                value={this.state.email}
                                editable={!this.props.email}
                                style={s.inputFields}
                                onChangeText={(text) => this.setState({email:text}) }/>
                        </View>
                        <View style={[s.row, s.inputParent]}>
                            <MaterialIcon style={s.inputIcon} name='phone' size={30} color={'#e16800'} />
                            <TextInput
                                placeholder='10 digit Mobile number'
                                keyboardType={"phone-pad"}
                                autofocus={!!this.props.name}
                                value={this.state.mobile}
                                style={s.inputFields}
                                onChangeText={(text) => this.setState({mobile:text}) }/>
                        </View>
                        {
                            this.props.emailBasedSignup &&
                            <View style={[s.row, s.inputParent]}>
                                <MaterialIcon style={s.inputIcon} name='lock' size={30} color={'#e16800'}/>
                                <TextInput
                                    placeholder='Password'
                                    value={this.state.password}
                                    style={s.inputFields}
                                    secureTextEntry={this.state.secureText}
                                    onChangeText={(text) => this.setState({password:text})} />
                                <Icon onPress={() => this.setState({secureText:!this.state.secureText})}
                                      name={this.state.secureText? 'eye-slash': 'eye'} size={24} color={'black'}/>
                            </View>
                        }
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={s.buttonSection}
                    disabled={this.props.inProgress}
                    onPress={this.handleSubmit}>
                    <View style={s.buttonWrapper}>
                        <View style={s.buttonTextWrapper}>
                            <Text style={s.buttonTextTop}>I accept all T&C</Text>
                            <Text style={s.buttonTextBottom}>{this.props.inProgress?"REGISTERING...":"REGISTER NOW"}</Text>
                        </View>
                        <Icon name={"chevron-circle-right"} size={20} color={"#F37521"}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: { flex: 1},

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
    signupIcon: { marginRight:5 },
    backIcon: { padding: 20 },


    scrollableArea: { flex: 1 },
    mainContent: { padding: [20,30] },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputParent: {
        marginBottom: 10,
    },
    inputFields: { flex: 1 },
    inputIcon: { width: 40 },


    buttonSection: {
        padding: [5,10],
        margin: [0,15],
        borderTopWidth: 1,
        borderTopColor: '#CCC'
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTextWrapper: {
        padding: 10,
        alignItems: 'center'
    },
    buttonTextTop: {},
    buttonTextBottom: {},
    button: { padding: 10},
});
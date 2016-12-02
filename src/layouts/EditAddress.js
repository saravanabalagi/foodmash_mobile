import React from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {addAddress, updateAddress} from '../reducers/address/addressActions';

@connect((store) => {
    return {

    };
})

class EditAddress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name: null,
            line1: null,
            line2: null,
            location_id: 3,
            mobile: null,
        }
    }

    handleSave = () => {
        if(this.props.edit) this.props.dispatch(updateAddress({address: this.state}));
        else this.props.dispatch(addAddress({address: this.state}));
    };

    render() {
        return (
            <View style={s.parent}>
                <View style={[s.row, s.inputParent]}>
                    <Icon style={s.inputIcon} name='user' size={30} color={'#CC0000'} />
                    <TextInput
                        placeholder='Name'
                        style={s.inputFields}
                        onChangeText={(text) => this.setState({name:text}) }/>
                </View>
                <View style={[s.row, s.inputParent]}>
                    <Icon style={s.inputIcon} name='home' size={30} color={'#CC0000'} />
                    <TextInput
                        placeholder='Address Line 1'
                        style={s.inputFields}
                        onChangeText={(text) => this.setState({line1:text}) }/>
                </View>
                <View style={[s.row, s.inputParent]}>
                    <Icon style={s.inputIcon} name='road' size={30} color={'#CC0000'} />
                    <TextInput
                        placeholder='Address Line 2'
                        style={s.inputFields}
                        onChangeText={(text) => this.setState({line2:text}) }/>
                </View>
                <View style={[s.row, s.inputParent]}>
                    <Icon style={s.inputIcon} name='phone' size={30} color={'#CC0000'} />
                    <TextInput
                        placeholder='Mobile'
                        style={s.inputFields}
                        onChangeText={(text) => this.setState({mobile:text}) }/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight style={s.button} onPress={this.handleSave}>
                        <Text>Save</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={s.button} onPress={this.handleDelete}>
                        <Text>Cancel</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        margin: 10,
        padding: 20
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
    button: {
        flex: 1,
        padding: 10,
        backgroundColor: '#C88',
        margin: 10
    },
    inputFields: {
        flex: 1
    },
    inputIcon: {
        width: 40
    }
});

export default EditAddress;
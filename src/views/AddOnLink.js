import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {fetchAddOn} from '../reducers/addOn/addOnActions';
import {connect} from 'react-redux';

@connect((store,props)=>{
    return {
        addOn: store.addOn.addOns[props.addOnLink.add_on_id]
    }
})

class AddOnLink extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount = () => { this.props.dispatch(fetchAddOn(this.props.addOnLink.add_on_id)); };

    render() {
        return (
            <TouchableOpacity onPress={()=>this.props.toggleSelect()}>
                <View style={s.parent}>
                    <Icon style={s.checkbox} name={this.props.selected?"check-square-o":"square-o"} size={20} color={"#000a74"}/>
                    <Text>{this.props.addOn? this.props.addOn.name: "Loading..."} (₹{this.props.addOnLink.price}) </Text>
                </View>
            </TouchableOpacity>
        );

    }

}

const s = StyleSheet.create({
    parent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkbox: {
        width: 25
    }
});

export default AddOnLink;
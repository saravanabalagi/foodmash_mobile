import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';


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
            <View style={s.parent}>
                <Text>{this.props.addOn? this.props.addOn.name: "Loading..."} ({this.props.addOnLink.price}) </Text>
            </View>
        );

    }

}

const s = StyleSheet.create({
    parent: {
    }
});

export default AddOnLink;
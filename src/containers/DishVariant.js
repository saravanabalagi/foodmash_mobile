import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import {connect} from 'react-redux';
import {fetchVariant} from '../reducers/variant/variantActions';
import Icon from 'react-native-vector-icons/FontAwesome';

@connect((store, props) => {
    return {
        variant: store.variant.variants[props.dishVariant.variant_id]
    }
})

class DishVariant extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount = () => { this.props.dispatch(fetchVariant(this.props.dishVariant.variant_id)); };

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.selectVariant(this.props.dishVariant)}
                style={s.parent} >
                <View style={s.touchable}>
                    <Icon style={s.checkbox} name={this.props.selected?"check-square-o":"square-o"} size={23} color={"#000a74"}/>
                    <View style={s.touchableRight}>
                        <Text style={s.title}> {this.props.variant? this.props.variant.display_name : "Loading..."}</Text>
                        <Text style={s.price}> ₹ {parseFloat(this.props.dishVariant.price)} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );

    }

}

const s = StyleSheet.create({
    parent: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 7,
        paddingBottom: 7,
    },
    touchable: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    touchableLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkbox: {
        width: 30
    },
    price: { fontSize: 12 },
    title: { fontSize: 15 }
});

export default DishVariant;
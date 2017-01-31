import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

import {connect} from 'react-redux';
import {fetchVariant} from '../reducers/variant/variantActions';

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
            <View key={this.props.dishVariant.id} style={s.variant}>
                <Text> Variant: {this.props.variant && this.props.variant.display_name}</Text>
                <Text> Rs. {this.props.dishVariant.price} </Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight
                        onPress={() => this.props.selectVariant(this.props.dishVariant)}
                        underlayColor={'#000'}
                        style={s.button} >
                        <Text>Select</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );

    }

}

const s = StyleSheet.create({
    parent: {
        padding: 20
    },
    button: {
        padding: 10,
        backgroundColor: '#CC8',
        margin: 10
    }
});

export default DishVariant;
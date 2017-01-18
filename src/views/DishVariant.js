import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

import {Actions} from 'react-native-router-flux'

class DishVariant extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => { if(this.props.index==0) this.props.selectVariant(this.props.dishVariant.id); };

    render() {
        return (
            <View key={this.props.dishVariant.id} style={s.variant}>
                <Text> Variant: {this.props.dishVariant.variant.display_name}</Text>
                <Text> Rs. {this.props.dishVariant.price} </Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight
                        onPress={() => this.props.selectVariant(this.props.dishVariant.id)}
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
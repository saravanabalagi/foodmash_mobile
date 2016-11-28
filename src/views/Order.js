import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import {Actions} from 'react-native-router-flux';

class Order extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight onPress={()=> Actions.viewOrderDetails({id: this.props.order.id})}>
                <View style={s.parent}>
                    <Text> { new Date(this.props.order.ordered_at).toDateString() } </Text>
                    <Text> { new Date(this.props.order.ordered_at).toLocaleTimeString() } </Text>
                    <Text> Rs. { this.props.order.total } </Text>
                </View>
            </TouchableHighlight>
        );

    }

}

const s = StyleSheet.create({
    parent: {
        padding: 20,
        backgroundColor: '#CCC',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5
    }
});

export default Order;
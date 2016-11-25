import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

class Order extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.parent}>
                <Text> { this.props.order.id } </Text>
                <Text> { this.props.order.user_id } </Text>
                <Text> { this.props.order.order_status_id } </Text>
                <Text> { this.props.order.address_id } </Text>
            </View>
        );

    }

}

const s = StyleSheet.create({

});

export default Order;
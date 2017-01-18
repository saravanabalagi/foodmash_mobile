import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

class AddOnLink extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.parent}>
                <Text>{this.props.addOnLink.add_on.name} ({this.props.addOnLink.price}) </Text>
            </View>
        );

    }

}

const s = StyleSheet.create({
    parent: {
    }
});

export default AddOnLink;
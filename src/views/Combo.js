import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

class Combo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.parent}>
                <Text> { this.props.combo.id } </Text>
                <Text> { this.props.combo.name } </Text>
            </View>
        );

    }

}

const s = StyleSheet.create({

});

export default Combo;
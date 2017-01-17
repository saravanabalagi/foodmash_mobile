import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

class AddOnTypeLink extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount = () => { if(this.props.index === 0) this.props.select_add_on_type_link(this.props.add_on_type_link.id); };

    render() {
        return (
            <View style={s.parent}>
                <TouchableHighlight
                    style={s.tab} underlayColor={'#BBB'}
                    onPress={() => this.props.select_add_on_type_link(this.props.add_on_type_link.id)}>
                    <Text style={s.text}> { this.props.add_on_type_link.add_on_type.name } </Text>
                </TouchableHighlight>
                { this.props.selected && <View style={s.highlight} /> }
            </View>
        );

    }

}

const s = StyleSheet.create({
    tab: { padding: 10},
    text: { fontSize: 17},
    highlight: {
        height: 5,
        backgroundColor: '#CC0000'
    }
});

export default AddOnTypeLink;
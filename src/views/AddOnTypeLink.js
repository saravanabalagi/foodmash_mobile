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

    componentWillMount = () => { if(this.props.index === 0) this.props.selectAddOnTypeLink(this.props.addOnTypeLink.id); };

    render() {
        return (
            <View style={s.parent}>
                <TouchableHighlight
                    style={s.tab} underlayColor={'#BBB'}
                    onPress={() => this.props.selectAddOnTypeLink(this.props.addOnTypeLink.id)}>
                    <Text style={s.text}> { this.props.addOnTypeLink.add_on_type.name } </Text>
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
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import {fetchAddOnType} from '../reducers/addOnType/addOnTypeActions';
import {connect} from 'react-redux';

@connect((store,props)=>{
    return {
        addOnType: store.addOnType.addOnTypes[props.addOnTypeLink.add_on_type_id]
    }
})

class AddOnTypeLink extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount = () => { this.props.dispatch(fetchAddOnType(this.props.addOnTypeLink.add_on_type_id)); };

    render() {
        return (
            <View style={s.parent}>
                <TouchableHighlight
                    style={s.tab} underlayColor={'#BBB'}
                    onPress={() => this.props.selectAddOnTypeLink(this.props.addOnTypeLink)}>
                    <Text style={s.text}> { this.props.addOnType && this.props.addOnType.name } ({this.props.addOnTypeLink.id}) </Text>
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
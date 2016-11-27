import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

class DishCategory extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.parent}>
                <TouchableHighlight
                    style={s.tab} underlayColor={'#BBB'}
                    onPress={(id) => this.props.selectDishCategory(this.props.dishCategory.id)}>
                    <Text style={s.text}> { this.props.dishCategory.name } </Text>
                </TouchableHighlight>
                { this.props.selected && <View style={s.highlight} /> }
            </View>
        );

    }

}

// onPress={this.props.selectDishCategory(this.props.dishCategory.id)}

const s = StyleSheet.create({
    tab: { padding: 10},
    text: { fontSize: 17},
    highlight: {
        height: 5,
        backgroundColor: '#CC0000'
    }
});

export default DishCategory;
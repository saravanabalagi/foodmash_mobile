import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet
} from 'react-native'
import {connect} from 'react-redux';
import {fetchCombos} from '../reducers/combo/comboActions';
import Combo from '../views/Combo';

@connect((store) => {
    return {
        combos: store.combo.combos,
        inProgress: store.combo.inProgress,
        error: store.combo.error
    };
})

class ComboList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => {
        this.props.dispatch(fetchCombos())
    };

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress && <Text> inProgress </Text> }
                {
                    this.props.combos.map((combo) => {
                        return <Combo key={combo.id} combo={combo} />
                    })
                }
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
            </View>
        );

    }

}

const s = StyleSheet.create({

});

export default ComboList;
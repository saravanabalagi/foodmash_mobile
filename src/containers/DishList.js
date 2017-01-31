import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import DishMini from '../views/DishMini';
import {connect} from 'react-redux';

@connect((store, props) => {
    return {
        dishes: props.dish_ids.map(key => store.dish.dishes[key]).filter(Boolean),
        inProgress: store.dish.inProgress,
        error: store.dish.error
    };
})

class DishList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress && <Text> inProgress </Text> }
                { this.props.dishes &&
                    this.props.dishes.map((dish) => {
                        return <DishMini key={dish.id}
                                         dish={dish}/>
                    })
                }
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
            </View>
        );

    }

}

const s = StyleSheet.create({

});

export default DishList;
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';

import {fetchRestaurant} from '../reducers/restaurant/restaurantActions';

@connect((store, props) => {
    return {
        restaurant: store.restaurant.restaurants[props.dish.restaurant_id],
        inProgress: store.dish.inProgress,
        error: store.dish.error
    };
})

class DishMini extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount = () => { this.props.dispatch(fetchRestaurant(this.props.dish.restaurant_id)); };

    render() {
        return (
            <TouchableHighlight
                onPress={() => Actions.viewDish({dish: this.props.dish})}
                style={s.parent}>
                <View>
                    <Text> { this.props.dish.name } </Text>
                    <Text> { this.props.restaurant && this.props.restaurant.name } </Text>
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
        marginBottom: 5,
        borderRadius: 10
    }
});

export default DishMini;
import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet
} from 'react-native'
import {connect} from 'react-redux';
import {fetchDishes} from '../reducers/dish/dishActions';
import Dish from '../views/Dish';

@connect((store) => {
    return {
        dishes: store.dish.dishes,
        inProgress: store.dish.inProgress,
        error: store.dish.error
    };
})

class DishList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => {
        this.props.dispatch(fetchDishes())
    };

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress && <Text> inProgress </Text> }
                {
                    this.props.dishes.map((dish) => {
                        return <Dish key={dish.id} dish={dish} />
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
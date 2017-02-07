import React from 'react';
import {
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import Dish from '../views/Dish';
import {connect} from 'react-redux';
import {fetchDish} from '../reducers/dish/dishActions';

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

    componentWillMount = () => { this.props.dish_ids.map(dish_id => this.props.dispatch(fetchDish(dish_id))); };

    render() {
        return (
            <ScrollView>
                <View style={s.parent}>
                    { this.props.inProgress && <Text> inProgress </Text> }
                    { this.props.dishes &&
                        this.props.dishes.map((dish) => {
                            return <Dish key={dish.id}
                                         dish={dish}/>
                        })
                    }
                    { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
                </View>
            </ScrollView>
        );

    }

}

const s = StyleSheet.create({

});

export default DishList;
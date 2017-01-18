import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet
} from 'react-native'
import {connect} from 'react-redux';
import DishMini from '../views/DishMini';

import {selectDishCategoryAndFetchDishes} from '../reducers/dishCategory/dishCategoryActions';

@connect((store) => {
    return {
        dishCategories: store.dishCategory.dish_categories,
        selectedDishCategory: store.dishCategory.selected,
    };
})

class DishList extends React.Component {

    constructor(props) { super(props); }

    componentDidMount = () => {
        let dishCategory = this.getDishCategory();
        if(!dishCategory.hasOwnProperty('dishes'))
            this.props.dispatch(selectDishCategoryAndFetchDishes(this.props.selectedDishCategory));
    };

    getDishCategory() { return this.props.dishCategories.filter(dishCategory => dishCategory.id === this.props.selectedDishCategory)[0]; }

    render() {
        return (
            <View style={s.parent}>
                { this.getDishCategory().inProgress && <Text> inProgress </Text> }
                {
                    this.getDishCategory().dishes &&
                    this.getDishCategory().dishes.map((dish) => {
                        return <DishMini key={dish.id} dish={dish} category_id={this.props.selectedDishCategory} />
                    })
                }
                { this.getDishCategory().error != null && !this.getDishCategory().inProgress && <Text> {this.getDishCategory().error.toString()} </Text> }
            </View>
        );

    }

}

const s = StyleSheet.create({

});

export default DishList;
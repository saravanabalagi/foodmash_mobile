import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    ScrollView,
    StyleSheet
} from 'react-native'
import {connect} from 'react-redux';
import DishCategory from '../views/DishCategory';
import DishList from '../containers/DishList';

import {fetchDishCategories} from '../reducers/dishCategory/dishCategoryActions';
import {fetchDish} from '../reducers/dish/dishActions';


@connect((store) => {
    return {
        dishCategories: store.dishCategory.dishCategories,
        inProgress: store.dishCategory.inProgress,
        error: store.dishCategory.error
    };
})

class DishCategoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDishCategory: null
        };
    }

    componentDidMount = () => { this.props.dispatch(fetchDishCategories()); };

    setSelectDishCategory = (id) => { this.setState({selectedDishCategory:id}, this.fetchDishesForSelectedDishCategory); };
    getSelectedDishCategory() { return this.props.dishCategories[this.state.selectedDishCategory]; };
    fetchDishesForSelectedDishCategory() { this.getSelectedDishCategory().dish_ids.map(dish_id => this.props.dispatch(fetchDish(dish_id))); }

    render() {
        return (
            <View style={s.parent}>
                <ScrollView style={s.tabBar} horizontal={true} showsHorizontalScrollIndicator={false} >
                    { this.props.inProgress && <Text> inProgress </Text> }
                    {   Object.keys(this.props.dishCategories).length !== 0 &&
                        Object.entries(this.props.dishCategories).map(([id,dishCategory],index) => {
                            return <DishCategory
                                        index={index}
                                        key={id}
                                        dishCategory={dishCategory}
                                        selectDishCategory={this.setSelectDishCategory}
                                        selected={dishCategory.id === this.state.selectedDishCategory} />
                        })
                    }
                    { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
                </ScrollView>
                <View>
                    {
                        this.state.selectedDishCategory &&
                        this.getSelectedDishCategory() &&
                        this.getSelectedDishCategory().dish_ids &&
                        <DishList dish_ids={this.getSelectedDishCategory().dish_ids}/>
                    }
                </View>
            </View>
        );

    }

}

const s = StyleSheet.create({
    tabBar: {
        marginLeft: 20,
        marginRight: 20
    }
});

export default DishCategoryList;
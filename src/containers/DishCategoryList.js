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
import {Scene, Router, Actions, ActionConst, Reducer} from 'react-native-router-flux';
import DishCategory from '../views/DishCategory';
import DishList from '../containers/DishList';

import {fetchDishCategories, selectDishCategoryAndFetchDishes} from '../reducers/dishCategory/dishCategoryActions';


@connect((store) => {
    return {
        dishCategories: store.dishCategory.dish_categories,
        selectedDishCategory: store.dishCategory.selected,
        inProgress: store.dishCategory.inProgress,
        error: store.dishCategory.error
    };
})

class DishCategoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => { if(this.props.dishCategories.length==0) this.props.dispatch(fetchDishCategories()); };
    handleSelectDishCategory = (id) => { this.props.dispatch(selectDishCategoryAndFetchDishes(id)); };

    render() {
        return (
            <View style={s.parent}>
                <ScrollView style={s.tabBar} horizontal={true} showsHorizontalScrollIndicator={false} >
                    { this.props.inProgress && <Text> inProgress </Text> }
                    {   this.props.dishCategories &&
                        this.props.dishCategories.map((dishCategory) => {
                            return <DishCategory
                                        key={dishCategory.id}
                                        dishCategory={dishCategory}
                                        selectDishCategory={this.handleSelectDishCategory}
                                        selected={dishCategory.id === this.props.selectedDishCategory} />
                        })
                    }
                    { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
                </ScrollView>
                { this.props.selectedDishCategory && <DishList /> }

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
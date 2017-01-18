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

import {fetchDishCategories, fetchDishesForDishCategory} from '../reducers/dishCategory/dishCategoryActions';


@connect((store) => {
    return {
        dishCategories: store.dishCategory.dish_categories,
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

    componentDidMount = () => { if(this.props.dishCategories.length==0) this.props.dispatch(fetchDishCategories()); };
    setSelectDishCategory = (id) => { this.setState({selectedDishCategory:id}); this.props.dispatch(fetchDishesForDishCategory(id)); };
    getSelectedDishCategory() { return this.props.dishCategories.filter(dishCategory => dishCategory.id === this.state.selectedDishCategory)[0]; };

    render() {
        return (
            <View style={s.parent}>
                <ScrollView style={s.tabBar} horizontal={true} showsHorizontalScrollIndicator={false} >
                    { this.props.inProgress && <Text> inProgress </Text> }
                    {   this.props.dishCategories &&
                        this.props.dishCategories.map((dishCategory,index) => {
                            return <DishCategory
                                        index={index}
                                        key={dishCategory.id}
                                        dishCategory={dishCategory}
                                        selectDishCategory={this.setSelectDishCategory}
                                        selected={dishCategory.id === this.state.selectedDishCategory} />
                        })
                    }
                    { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
                </ScrollView>
                <View>
                    { this.state.selectedDishCategory && this.getSelectedDishCategory() &&
                        <DishList dishCategory={this.getSelectedDishCategory()} />
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
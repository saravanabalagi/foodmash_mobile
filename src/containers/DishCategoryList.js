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

import {fetchDishCategories} from '../reducers/dishCategory/dishCategoryActions';
import {selectDishCategory} from '../reducers/dishCategory/dishCategoryActions';


@connect((store) => {
    return {
        dishCategories: store.dishCategory.dishCategories,
        selectedDishCategory: store.dishCategory.selected,
        inProgress: store.dishCategory.inProgress,
        error: store.dishCategory.error
    };
})

class DishList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => { this.props.dispatch(fetchDishCategories()) };
    handleSelectDishCategory = (id) => { this.props.dispatch(selectDishCategory(id)); };

    render() {
        return (
            <View style={s.parent}>
                <ScrollView style={s.tabBar} horizontal={true}>
                    { this.props.inProgress && <Text> inProgress </Text> }
                    {
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
                <View style={{padding:50, backgroundColor: 'blue'}}>
                    <Text>Hello there</Text>
                </View>
            </View>
        );

    }

}

const s = StyleSheet.create({
    tabBar: {
    }
});

export default DishList;
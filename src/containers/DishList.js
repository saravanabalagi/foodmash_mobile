import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet
} from 'react-native'
import {connect} from 'react-redux';
import {fetchDishCategories} from '../reducers/dishCategory/dishCategoryActions';
import DishCategory from '../views/DishCategory';

@connect((store) => {
    return {
        dishCategories: store.dishCategory.dishCategories,
        inProgress: store.dishCategory.inProgress,
        error: store.dishCategory.error
    };
})

class DishList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => {
        this.props.dispatch(fetchDishCategories())
    };

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress && <Text> inProgress </Text> }
                {
                    this.props.dishCategories.map((dishCategory) => {
                        return <DishCategory key={dishCategory.id} dishCategory={dishCategory} />
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
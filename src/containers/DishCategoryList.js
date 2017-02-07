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
import ScrollableTabView from 'react-native-scrollable-tab-view';

import DishList from '../containers/DishList';
import {fetchDishCategories} from '../reducers/dishCategory/dishCategoryActions';


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

        };
    }

    componentWillMount = () => { this.props.dispatch(fetchDishCategories()); };

    render() {
        return (
            <View style={s.parent}>
                <ScrollableTabView style={s.tabs}>
                    {
                        Object.entries(this.props.dishCategories).map(([id,dishCategory]) => {
                            return(
                                <DishList
                                    key={id}
                                    tabLabel={dishCategory.name}
                                    dish_ids={dishCategory.dish_ids}/>
                            )
                        })
                    }
                </ScrollableTabView>
            </View>
        );

    }

}

const s = StyleSheet.create({
    parent:{
        flex: 1,
        marginBottom: 80
    },
    tabs: {
        flex: 1
    }
});

export default DishCategoryList;
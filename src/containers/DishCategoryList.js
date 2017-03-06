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

import {getErrorDisplayString} from '../helpers/errorHelper';
import SnackBar from 'react-native-snackbar-dialog';

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
    componentWillReceiveProps = (nextProps) => {
        if(this.props.error!=nextProps.error && Object.values(nextProps.error).length>0)
            Object.values(nextProps.error).reduce((errors,error)=>
                error!=null&&errors.includes(getErrorDisplayString(error))?(errors.push(getErrorDisplayString(error)),errors):errors,[])
                .forEach(errorString=> SnackBar.add(errorString,{ confirmText:"Dismiss", onConfirm: ()=>SnackBar.dismiss()}));
    };

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
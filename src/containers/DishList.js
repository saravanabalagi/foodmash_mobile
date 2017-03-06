import React from 'react';
import {
    Text,
    View,
    TextInput,
    ListView,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import Dish from './Dish';
import Loading from '../views/Loading';

import {connect} from 'react-redux';
import {fetchDish} from '../reducers/dish/dishActions';
import {fetchRestaurant} from '../reducers/restaurant/restaurantActions';

import {getErrorDisplayString} from '../helpers/errorHelper';
import SnackBar from 'react-native-snackbar-dialog';

@connect((store, props) => {
    return {
        dishes: store.dish.dishes,
        restaurants: store.restaurant.restaurants,
        inProgress: store.dish.inProgress,
        error: store.dish.error
    };
})

class DishList extends React.Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (a,b)=>a!==b,
            sectionHeaderHasChanged: (a,b)=>a!==b,
            getRowData: (dataBlob, sectionId, rowId)=>dataBlob[sectionId + ':' + rowId],
            getSectionData: (dataBlob, sectionId)=>dataBlob[sectionId]
        });
        this.state = {
            dataSource: this.ds.cloneWithRowsAndSections({},[],[]),
            selectedDish: null,
        }
    }

    componentWillMount = () => { this.componentWillReceiveProps(this.props); };
    componentWillReceiveProps = (nextProps) => {
        this.props.dish_ids.forEach(dishId => { if (nextProps.dishes[dishId]==null) this.props.dispatch(fetchDish(dishId)); });
        if(this.props.dish_ids.every(dishId => nextProps.dishes[dishId]!=null)) {
            let dishes = this.props.dish_ids.map(dishId => nextProps.dishes[dishId]);
            let restaurantIds = dishes.reduce((restaurantIds,dish)=>restaurantIds.includes(dish.restaurant_id)?restaurantIds:(restaurantIds.push(dish.restaurant_id),restaurantIds),[]);
            restaurantIds.forEach(restaurantId=>{ if (nextProps.restaurants[restaurantId]==null) this.props.dispatch(fetchRestaurant(restaurantId)); });
            if(restaurantIds.every(restaurantId=>nextProps.restaurants[restaurantId]!=null)) {
                let dataBlob = {};
                let dishesForRestaurant = {};
                restaurantIds.forEach(restaurantId=>{
                    dataBlob[restaurantId] = nextProps.restaurants[restaurantId].name;
                    dishesForRestaurant[restaurantId] = [];
                });
                dishes.forEach(dish=>{
                    dishesForRestaurant[dish.restaurant_id].push(dish.id);
                    dataBlob[dish.restaurant_id + ':' + dish.id] = dish;
                });
                this.setState({ dataSource: this.ds.cloneWithRowsAndSections(dataBlob, restaurantIds, Object.values(dishesForRestaurant))});
            }
        }

        if(this.props.error!=nextProps.error && Object.values(nextProps.error).length>0)
            Object.values(nextProps.error).reduce((errors,error)=>
                error!=null&&errors.includes(getErrorDisplayString(error))?(errors.push(getErrorDisplayString(error)),errors):errors,[])
                .forEach(errorString=> SnackBar.add(errorString,{ confirmText:"Dismiss", onConfirm: ()=>SnackBar.dismiss()}));

    };

    toggleSelectDish = (dish) => { if(this.state.selectedDish!=dish) this.setState({selectedDish: dish}); else this.setState({selectedDish:null}); };

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress.length>0 && <Loading /> }
                <ListView dataSource={this.state.dataSource}
                          renderSectionHeader={(sectionData) => { return <Text style={s.restaurantName}>{sectionData.toUpperCase()}</Text> }}
                          renderRow={(dish) => {
                            return <Dish dish={dish}
                                         key={dish.id}
                                         toggleSelect={()=>this.toggleSelectDish(dish)}
                                         selected={dish==this.state.selectedDish}/>
                          }}>
                </ListView>
            </View>
        );

    }

}

const s = StyleSheet.create({
    parent: {},
    restaurantName: {
        fontSize: 14,
        padding: [10,15],
        backgroundColor: '#F6F6F6',
        marginBottom: 5
    }
});

export default DishList;
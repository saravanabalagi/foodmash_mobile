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
    };

    toggleSelectDish = (dish) => { if(this.state.selectedDish!=dish) this.setState({selectedDish: dish}); else this.setState({selectedDish:null}); };

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress.length>0 && <Loading /> }
                <ListView dataSource={this.state.dataSource}
                          renderSectionHeader={(sectionData) => {
                              console.log(sectionData);
                              return <Text style={s.restaurantName}>{sectionData.toUpperCase()}</Text>
                          }}
                          renderRow={(dish) => {
                              console.log("RowData: ",dish);
                        return <Dish dish={dish}
                                     key={dish.id}
                                     toggleSelect={()=>this.toggleSelectDish(dish)}
                                     selected={dish==this.state.selectedDish}/>
                    }}>
                </ListView>
                { this.props.error != null && !this.props.inProgress && <Text> {this.props.error.toString()} </Text> }
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
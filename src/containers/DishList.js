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

@connect((store, props) => {
    return {
        dishes: props.dish_ids.map(key => store.dish.dishes[key]).filter(Boolean),
        inProgress: store.dish.inProgress,
        error: store.dish.error
    };
})

class DishList extends React.Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (a,b)=>a!==b});
        this.state = {
            selectedDish: null,
        }
    }

    componentWillMount = () => { this.props.dish_ids.map(dish_id => this.props.dispatch(fetchDish(dish_id))); };
    toggleSelectDish = (dish) => { if(this.state.selectedDish!=dish) this.setState({selectedDish: dish}); else this.setState({selectedDish:null}); };

    render() {
        return (
            <View style={s.parent}>
                { this.props.inProgress.length>0 && <Loading /> }
                <ListView dataSource={this.ds.cloneWithRows(this.props.dishes)}
                          enableEmptySections={true}
                          renderRow={(dish) => {
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
    parent: {
        paddingTop: 10
    }
});

export default DishList;
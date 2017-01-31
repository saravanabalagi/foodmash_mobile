import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import DishVariant from '../views/DishVariant';
import AddOnSelector from '../views/AddOnSelector';

import {fetchDishVariant} from '../reducers/dishVariant/dishVariantActions';
import {plusOneDishVariantToCart, minusOneDishVariantToCart, getDishQuantity} from '../reducers/cart/cartActions';

@connect((store,props) => {
    return {
        dishVariants: props.dish.dish_variant_ids.map(dishVariantId => store.dishVariant.dishVariants[dishVariantId]).filter(Boolean),
        quantityInCart: getDishQuantity(props.dish.id) || 0
    }
})


export default class ViewDish extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDishVariant: this.props.dishVariants[0]
        }
    }

    componentWillMount = () => { console.log("ViewDish Mounted"); this.props.dish.dish_variant_ids.map(dishVariantId => this.props.dispatch(fetchDishVariant(dishVariantId))); };
    componentWillReceiveProps = (nextProps) => { if(this.state.selectedDishVariant == null && nextProps.dishVariants != null) this.setState({selectedDishVariant: nextProps.dishVariants[0]}); };

    addToCart = () => { this.props.dispatch(plusOneDishVariantToCart({id: this.state.selectedDishVariant.id, ordered:{}})) };
    removeFromCart = () => { this.props.dispatch(minusOneDishVariantToCart({id: this.state.selectedDishVariant.id, ordered:{}})) };

    render() {
        return (
            <View style={s.parent}>
                <TouchableHighlight
                    onPress={Actions.pop}
                    style={{padding:10, backgroundColor: '#f77', margin: 10}}>
                    <Text>Go back</Text>
                </TouchableHighlight>
                <Text> Dish id: { this.props.dish.id } </Text>
                <Text> Name: { this.props.dish.name } </Text>
                <Text> DishVariants: { this.props.dishVariants.length } </Text>
                { this.props.dishVariants.length>1 && this.props.dishVariants.map(dishVariant => {
                    return (
                        <DishVariant key={dishVariant.id}
                                     dishVariant={dishVariant}
                                     selectVariant={(dishVariant)=>this.setState({selectedDishVariant: dishVariant})} />
                    )
                }) }
                { this.props.dish.error == null && !this.props.dish.inProgress &&
                    <View>
                        {
                            this.state.selectedDishVariant &&
                            <AddOnSelector dishVariant={this.state.selectedDishVariant} />
                        }
                        <Text> Selected: {this.state.selectedDishVariant && this.state.selectedDishVariant.id} </Text>
                        <Text> In Cart : {this.props.quantityInCart} </Text>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableHighlight
                                onPress={this.addToCart}
                                underlayColor={'#000'}
                                style={s.button} >
                                <Text>Add to Cart</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={this.removeFromCart}
                                underlayColor={'#000'}
                                style={s.button} >
                                <Text>Remove from Cart</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                }
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        padding: 10,
        backgroundColor: '#CCC'
    },
    button: {
        padding: 10,
        backgroundColor: '#C88',
        margin: 10
    }
});
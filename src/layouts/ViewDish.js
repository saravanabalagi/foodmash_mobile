import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import Dish from '../views/Dish';
import {fetchDish} from '../reducers/dishCategory/dishCategoryActions';
import {plusOneDishVariantToCart, minusOneDishVariantToCart, getDishQuantity} from '../reducers/cart/cartActions';

@connect((store) => {
    return {
        dishCategories: store.dishCategory.dishCategories,
        cartDishVariants: store.cart.dish_variants
    }
})


export default class ViewDish extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected_variant_id: null,
            cart_count: null
        }
    }

    componentDidMount = () => { if(this.getDish() && !this.getDish().hasOwnProperty('dish_variants')) this.props.dispatch(fetchDish(this.props.id, this.props.category_id));};

    addToCart = () => { this.props.dispatch(plusOneDishVariantToCart({id: this.state.selected_variant_id, dish_id: this.getDish().id, dish_category_id: this.props.category_id, ordered:{}})) };
    removeFromCart = () => { this.props.dispatch(minusOneDishVariantToCart({id: this.state.selected_variant_id, dish_id: this.getDish().id, dish_category_id: this.props.category_id, ordered:{}})) };
    setSelectedVariant = (variant_id) => { this.setState({selected_variant_id: variant_id}); };

    getDish() { return this.props.dishCategories.filter(dishCategory => dishCategory.id === this.props.category_id)[0].dishes.filter(dish => dish.id == this.props.id)[0] }
    getSelectedDishVariant() { if(this.getDish().hasOwnProperty('dish_variants')) return this.getDish().dish_variants.filter(dish_variant => dish_variant.id === this.state.selected_variant_id)[0]; }
    getQuantity() { return this.props.cartDishVariants.reduce((quantity, dish_variant) => { return (dish_variant.dish_id === this.props.id)? quantity+dish_variant.quantity : quantity; }, 0); }

    getAddOns() {
        let addOns = [];
        if(this.getSelectedDishVariant()) {
            addOns.push(...this.getSelectedDishVariant().add_on_type_links);
            addOns.push(...this.getSelectedDishVariant().variant.add_on_type_links);
            addOns.push(...this.getSelectedDishVariant().variant.variant_category.add_on_type_links);
        }
        console.log("Dish: ",this.getDish());
        return addOns;
    };

    render() {
        return (
            <View style={s.parent}>
                <TouchableHighlight
                    onPress={Actions.pop}
                    style={{padding:10, backgroundColor: '#f77', margin: 10}}>
                    <Text>Go back</Text>
                </TouchableHighlight>
                <Text> Dish id: { this.props.id } </Text>
                { this.getDish() && this.getDish().inProgress && <Text> inProgress </Text> }
                { this.getDish() && this.getDish().hasOwnProperty('dish_variants') && <Dish dish={this.getDish()} category_id={this.props.category_id} selectVariant={this.setSelectedVariant} /> }
                { this.getDish() && this.getDish().error == null && !this.getDish().inProgress &&
                    <View>
                        { this.getDish().hasOwnProperty('dish_variants') && this.getAddOns().map(add_on_type_link => {
                            return <View key={add_on_type_link.id}>
                                <Text> {add_on_type_link.add_on_type.name} </Text>
                                { add_on_type_link.add_on_links.map(add_on_link => {
                                    return <View key={add_on_link.id}>
                                        <Text> {add_on_link.add_on.name} ({add_on_link.price})</Text>
                                    </View>
                                }) }
                            </View>
                        }) }
                        <Text> Selected: {this.state.selected_variant_id} </Text>
                        <Text> In Cart : {this.getQuantity()} </Text>
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
                { this.getDish() && this.getDish().error != null && !this.getDish().inProgress && <Text> {this.getDish().error.toString()} </Text> }
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
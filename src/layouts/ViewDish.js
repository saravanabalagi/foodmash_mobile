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

import Dish from '../views/Dish';
import AddOnSelector from '../views/AddOnSelector';

import {fetchDish} from '../reducers/dishCategory/dishCategoryActions';
import {plusOneDishVariantToCart, minusOneDishVariantToCart, getDishQuantity} from '../reducers/cart/cartActions';

@connect((store,props) => {
    return {
        dish: store.dishCategory.dish_categories.filter(dishCategory => dishCategory.id === props.dishCategoryId)[0].dishes.filter(dish => dish.id == props.id)[0],
        cartDishVariants: store.cart.dish_variants
    }
})


export default class ViewDish extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedVariantId: null
        }
    }

    componentDidMount = () => { if(this.props.dish && !this.props.dish.hasOwnProperty('dish_variants')) this.props.dispatch(fetchDish(this.props.id, this.props.dishCategoryId));};

    addToCart = () => { this.props.dispatch(plusOneDishVariantToCart({id: this.state.selectedVariantId, dish_id: this.props.dish.id, dish_category_id: this.props.dishCategoryId, ordered:{}})) };
    removeFromCart = () => { this.props.dispatch(minusOneDishVariantToCart({id: this.state.selectedVariantId, dish_id: this.props.dish.id, dish_category_id: this.props.dishCategoryId, ordered:{}})) };
    setSelectedVariant = (variantId) => { this.setState({selectedVariantId: variantId}); };

    getSelectedDishVariant() { if(this.props.dish.hasOwnProperty('dish_variants')) return this.props.dish.dish_variants.filter(dishVariant => dishVariant.id === this.state.selectedVariantId)[0]; }
    getQuantity() { return this.props.cartDishVariants.reduce((quantity, dishVariant) => { return (dishVariant.dish_id === this.props.id)? quantity+dishVariant.quantity : quantity; }, 0); }

    getAddOnTypeLinks() {
        let addOns = [];
        if(this.getSelectedDishVariant()) {
            addOns.push(...this.getSelectedDishVariant().add_on_type_links);
            addOns.push(...this.getSelectedDishVariant().variant.add_on_type_links);
            if(addOns.push(...this.getSelectedDishVariant().variant.hasOwnProperty('variant_category')))
                addOns.push(...this.getSelectedDishVariant().variant.variant_category.add_on_type_links);
        }
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
                { this.props.dish && this.props.dish.inProgress && <Text> inProgress </Text> }
                { this.props.dish && this.props.dish.hasOwnProperty('dish_variants') && <Dish dish={this.props.dish} category_id={this.props.dishCategoryId} selectVariant={this.setSelectedVariant} /> }
                { this.props.dish && this.props.dish.error == null && !this.props.dish.inProgress &&
                    <View>
                        {
                            this.props.dish.hasOwnProperty('dish_variants') &&
                            <AddOnSelector addOnTypeLinks={this.getAddOnTypeLinks()} />
                        }
                        <Text> Selected: {this.state.selectedVariantId} </Text>
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
                { this.props.dish && this.props.dish.error != null && !this.props.dish.inProgress && <Text> {this.props.dish.error.toString()} </Text> }
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
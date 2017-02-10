import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import DishVariant from '../views/DishVariant';
import AddOnSelector from '../views/AddOnSelector';

import {fetchDishVariant} from '../reducers/dishVariant/dishVariantActions';
import {fetchRestaurant} from '../reducers/restaurant/restaurantActions';
import {plusOneDishVariantToCart, minusOneDishVariantLenientToCart, getDishQuantity} from '../reducers/cart/cartActions';

@connect((store,props) => {
    return {
        dishVariants: props.dish.dish_variant_ids.map(dishVariantId => store.dishVariant.dishVariants[dishVariantId]).filter(Boolean).sort((a,b)=>a.price-b.price),
        quantityInCart: getDishQuantity(props.dish.id) || 0
    }
})


export default class Dish extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDishVariant: this.props.dishVariants[0],
            selectedAddOnLinks: []
        }
    }

    componentWillMount = () => { this.props.dispatch(fetchRestaurant(this.props.dish.restaurant_id)); this.props.dish.dish_variant_ids.map(dishVariantId => this.props.dispatch(fetchDishVariant(dishVariantId))); };
    componentWillReceiveProps = (nextProps) => { if(this.state.selectedDishVariant == null && nextProps.dishVariants != null || nextProps.dishVariants.length > this.props.dishVariants.length) this.setState({selectedDishVariant: nextProps.dishVariants[0]}); };

    addToCart = () => { this.props.dispatch(plusOneDishVariantToCart({id: this.state.selectedDishVariant.id, ordered:{addOnLinks:this.state.selectedAddOnLinks.map(addOnLink => addOnLink.id)}})) };
    removeFromCart = () => { this.props.dispatch(minusOneDishVariantLenientToCart({id: this.state.selectedDishVariant.id, ordered:{addOnLinks:this.state.selectedAddOnLinks.map(addOnLink => addOnLink.id)}})) };

    toggleSelectAddOnLink = (addOnLink) => {
        if(!this.state.selectedAddOnLinks.includes(addOnLink))
            this.setState({selectedAddOnLinks: [...this.state.selectedAddOnLinks, addOnLink]});
        else this.setState({selectedAddOnLinks: this.state.selectedAddOnLinks.filter(el=> el.id!=addOnLink.id)});
    };

    render() {
        return (
            <View style={s.parent}>
                <TouchableOpacity onPress={this.props.toggleSelect}>
                    <View style={s.titleRow}>
                        <Text style={s.title}> { this.props.dish.name } </Text>
                        <View style={s.actions}>
                            <Text style={s.price}>₹ {(this.state.selectedDishVariant)?this.state.selectedAddOnLinks.reduce((price, addOnLink)=> price+parseFloat(addOnLink.price),parseFloat(this.state.selectedDishVariant.price)):"Loading..."}</Text>
                            {
                                this.props.quantityInCart>0 &&
                                <View style={s.actions}>
                                    <TouchableOpacity
                                        onPress={this.removeFromCart}
                                        style={s.button} >
                                        <Icon name={"minus-circle"} size={20} color={"#F37521"}/>
                                    </TouchableOpacity>
                                    <Text style={s.quantity}> {this.props.quantityInCart} </Text>
                                </View>
                            }
                            {
                                (this.props.selected || this.props.dishVariants.length === 1) &&
                                <TouchableOpacity
                                    onPress={this.addToCart}
                                    style={s.button}>
                                    <Icon name={"plus-circle"} size={20} color={"#F37521"}/>
                                </TouchableOpacity>
                            }
                            {
                                !this.props.selected && this.props.dishVariants.length > 1 &&
                                <Icon style={s.button} name={"chevron-circle-down"} size={20} color={"#F37521"}/>
                            }
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    this.props.selected &&
                    <View>
                        { this.props.dishVariants.length > 1 &&
                            <ScrollView
                                horizontal={true}
                                style={s.dishVariantSelector}>
                                {this.props.dishVariants.map(dishVariant => {
                                    return (
                                        <DishVariant key={dishVariant.id}
                                                     dishVariant={dishVariant}
                                                     selected={dishVariant == this.state.selectedDishVariant}
                                                     selectVariant={(dishVariant) => this.setState({selectedDishVariant: dishVariant, selectedAddOnLinks: []})}/>
                                    )
                                }) }
                            </ScrollView>
                        }
                        { this.props.dish.error == null && !this.props.dish.inProgress &&
                        <View>
                            {
                                this.state.selectedDishVariant &&
                                <AddOnSelector
                                    selectedAddOnLinkIds={this.state.selectedAddOnLinks.map(addOnLink=>addOnLink.id)}
                                    toggleSelectAddOnLink={(addOnLink)=>this.toggleSelectAddOnLink(addOnLink)}
                                    dishVariant={this.state.selectedDishVariant} />
                            }
                        </View>
                        }
                    </View>
                }
            </View>
        );
    }
}

const s = StyleSheet.create({
    parent: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 15
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    price: {
        padding: 6
    },
    quantity: {
        fontSize: 18
    },
    dishVariantSelector: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    }
});
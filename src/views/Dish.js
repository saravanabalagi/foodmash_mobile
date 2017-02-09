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
import {plusOneDishVariantToCart, minusOneDishVariantToCart, getDishQuantity} from '../reducers/cart/cartActions';

@connect((store,props) => {
    return {
        dishVariants: props.dish.dish_variant_ids.map(dishVariantId => store.dishVariant.dishVariants[dishVariantId]).filter(Boolean),
        quantityInCart: getDishQuantity(props.dish.id) || 0
    }
})


export default class Dish extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDishVariant: this.props.dishVariants[0],
            selectedAddOnLinkIds: []
        }
    }

    componentWillMount = () => { this.props.dispatch(fetchRestaurant(this.props.dish.restaurant_id)); this.props.dish.dish_variant_ids.map(dishVariantId => this.props.dispatch(fetchDishVariant(dishVariantId))); };
    componentWillReceiveProps = (nextProps) => { if(this.state.selectedDishVariant == null && nextProps.dishVariants != null) this.setState({selectedDishVariant: nextProps.dishVariants[0]}); };

    addToCart = () => { this.props.dispatch(plusOneDishVariantToCart({id: this.state.selectedDishVariant.id, ordered:{}})) };
    removeFromCart = () => { this.props.dispatch(minusOneDishVariantToCart({id: this.state.selectedDishVariant.id, ordered:{}})) };

    toggleSelectAddOnLink = (addOnLink) => {
        if(!this.state.selectedAddOnLinkIds.includes(addOnLink.id))
            this.setState({selectedAddOnLinkIds: [...this.state.selectedAddOnLinkIds, addOnLink.id]});
        else this.setState({selectedAddOnLinkIds: this.state.selectedAddOnLinkIds.filter(id=> id!=addOnLink.id)});
    };

    render() {
        return (
            <View style={s.parent}>
                <TouchableOpacity onPress={this.props.toggleSelect}>
                    <View style={s.titleRow}>
                        <Text style={s.title}> { this.props.dish.name } </Text>
                        <View style={s.actions}>
                            <Text>₹ {this.props.dishVariants.reduce((min,i)=>(i.price<min)?i.price:min,99999)}</Text>
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
                            <TouchableOpacity
                                onPress={this.addToCart}
                                style={s.button} >
                                <Icon name={"plus-circle"} size={20} color={"#F37521"}/>
                            </TouchableOpacity>
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
                                                     selectVariant={(dishVariant) => this.setState({selectedDishVariant: dishVariant})}/>
                                    )
                                }) }
                            </ScrollView>
                        }
                        { this.props.dish.error == null && !this.props.dish.inProgress &&
                        <View>
                            {
                                this.state.selectedDishVariant &&
                                <AddOnSelector
                                    selectedAddOnLinkIds={this.state.selectedAddOnLinkIds}
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
    quantity: {
        fontSize: 18
    },
    dishVariantSelector: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    }
});
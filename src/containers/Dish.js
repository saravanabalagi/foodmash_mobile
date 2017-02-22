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
import DishVariant from './DishVariant';
import AddOnSelector from './AddOnSelector';

import {fetchDishVariant} from '../reducers/dishVariant/dishVariantActions';
import {fetchRestaurant} from '../reducers/restaurant/restaurantActions';
import {plusOneDishVariantToCart, minusOneDishVariantLenientToCart, getDishQuantity} from '../reducers/cart/cartActions';

@connect((store,props) => {
    return {
        dishVariants: props.dish.dish_variant_ids.map(dishVariantId => store.dishVariant.dishVariants[dishVariantId]).filter(Boolean).sort((a, b)=>a.price-b.price),
        addOnTypeLinks: store.addOnTypeLink.addOnTypeLinks,
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

    addToCart = () => { this.props.dispatch(plusOneDishVariantToCart({dish_variant_id: this.state.selectedDishVariant.id, note:null, add_on_link_ids:this.state.selectedAddOnLinks.map(addOnLink => addOnLink.id)}, this.props.dish.restaurant_id)) };
    removeFromCart = () => { this.props.dispatch(minusOneDishVariantLenientToCart({dish_variant_id: this.state.selectedDishVariant.id, note:null, add_on_link_ids:this.state.selectedAddOnLinks.map(addOnLink => addOnLink.id)}, this.props.dish.restaurant_id)) };

    toggleSelectAddOnLink = (addOnLink) => {
        if(!this.state.selectedAddOnLinks.includes(addOnLink)) {
            let newSelectedAddOnLinks = [...this.state.selectedAddOnLinks, addOnLink];
            let addOnTypeLinkMax = this.props.addOnTypeLinks[addOnLink.add_on_type_link_id].max;
            if(addOnTypeLinkMax!=null) newSelectedAddOnLinks = newSelectedAddOnLinks.reduceRight((count => (array,e) => (((e.add_on_type_link_id===addOnLink.add_on_type_link_id)? (count<addOnTypeLinkMax?(count++,array.unshift(e)):count++) : array.unshift(e)),array))(0),[]);
            this.setState({selectedAddOnLinks: newSelectedAddOnLinks});
        }
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
                            <View style={s.dishVariantSelector}>
                                <View style={s.dishVariantSelectorLeft}>
                                {
                                    this.props.dishVariants.filter((e,index)=>index%2===0).map(dishVariant => {
                                        return (
                                            <DishVariant key={dishVariant.id}
                                                         dishVariant={dishVariant}
                                                         selected={dishVariant == this.state.selectedDishVariant}
                                                         selectVariant={(dishVariant) => this.setState({selectedDishVariant: dishVariant, selectedAddOnLinks: []})}/>
                                        )
                                    })
                                }
                                </View>
                                <View style={s.dishVariantSelectorRight}>
                                {
                                    this.props.dishVariants.filter((e,index)=>index%2!==0).map(dishVariant => {
                                        return (
                                            <DishVariant key={dishVariant.id}
                                                         dishVariant={dishVariant}
                                                         selected={dishVariant == this.state.selectedDishVariant}
                                                         selectVariant={(dishVariant) => this.setState({selectedDishVariant: dishVariant, selectedAddOnLinks: []})}/>
                                        )
                                    })
                                }
                                </View>
                            </View>
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
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
    dishVariantSelectorLeft: { flex: 1 },
    dishVariantSelectorRight: { flex: 1 }
});
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

import {fetchAddOn} from '../reducers/addOn/addOnActions';
import {fetchAddOnLink} from '../reducers/addOnLink/addOnLinkActions';
import {fetchAddOnType} from '../reducers/addOnType/addOnTypeActions';
import {fetchAddOnTypeLink} from '../reducers/addOnTypeLink/addOnTypeLinkActions';
import {fetchDishVariant} from '../reducers/dishVariant/dishVariantActions';
import {fetchVariant} from '../reducers/variant/variantActions';
import {fetchDish} from '../reducers/dish/dishActions';
import {fetchRestaurant} from '../reducers/restaurant/restaurantActions';

@connect((store,props) => {
    return {
        addOns: store.addOn.addOns,
        addOnLinks: props.orderItem.add_on_link_ids.map(addOnLinkId => store.addOnLink.addOnLinks[addOnLinkId]).filter(Boolean),
        addOnTypeLinks: store.addOnTypeLink.addOnTypeLinks,
        addOnTypes: store.addOnType.addOnTypes,
        variants: store.variant.variants,
        dishVariants: store.dishVariant.dishVariants,
        dishes: store.dish.dishes,
        restaurants: store.restaurant.restaurants
    }
})

class CartItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        this.props.dispatch(fetchDishVariant(this.props.orderItem.dish_variant_id));
        this.props.orderItem.add_on_link_ids.forEach(addOnLinkId => this.props.dispatch(fetchAddOnLink(addOnLinkId)));
    };

    componentWillReceiveProps = (nextProps) => {
        let dishVariant = nextProps.dishVariants[this.props.orderItem.dish_variant_id];
        let variant = (dishVariant)?nextProps.variants[dishVariant.variant_id]:null;
        let dish = (dishVariant)?nextProps.dishes[dishVariant.dish_id]:null;
        let restaurant = (dish)?nextProps.restaurants[dish.restaurant_id]:null;
        if(dishVariant && variant==null) this.props.dispatch(fetchVariant(dishVariant.variant_id));
        if(dishVariant && dish==null) this.props.dispatch(fetchDish(dishVariant.dish_id));
        if(dishVariant && dish && restaurant==null) this.props.dispatch(fetchRestaurant(dish.restaurant_id));

        if(nextProps.addOnLinks.length === this.props.orderItem.add_on_link_ids.length) {
            let addOnTypeLinkIds = nextProps.addOnLinks.reduce((array,e)=>(array.includes(e.add_on_type_link_id)?null:array.push(e.add_on_type_link_id),array),[]);
            if(nextProps.addOnLinks.length !== this.props.addOnLinks.length) {
                nextProps.addOnLinks.forEach(addOnLink => this.props.dispatch(fetchAddOn(addOnLink.add_on_id)));
                addOnTypeLinkIds.forEach(addOnTypeLinkId => this.props.dispatch(fetchAddOnTypeLink(addOnTypeLinkId)));
            }
            let previousAddOnTypeLinks = addOnTypeLinkIds.map(addOnTypeLinkId => this.props.addOnTypeLinks[addOnTypeLinkId]).filter(Boolean);
            let nextAddOnTypeLinks = addOnTypeLinkIds.map(addOnTypeLinkId => nextProps.addOnTypeLinks[addOnTypeLinkId]).filter(Boolean);
            if(previousAddOnTypeLinks.length !== nextAddOnTypeLinks.length && nextAddOnTypeLinks.length === addOnTypeLinkIds.length) {
                let addOnTypeIds = nextAddOnTypeLinks.reduce((array,e)=>(array.includes(e.add_on_type_id)?null:array.push(e.add_on_type_id),array),[])
                addOnTypeIds.forEach(addOnTypeId => this.props.dispatch(fetchAddOnType(addOnTypeId)));
            }
        }

    };

    getDishVariant = (dishVariantId) => { return this.props.dishVariants[dishVariantId] };
    getVariant = (dishVariantId) => { return this.getDishVariant(dishVariantId)? this.props.variants[this.getDishVariant(dishVariantId).variant_id] : null };
    getDish = (dishVariantId) => { return this.getDishVariant(dishVariantId)? this.props.dishes[this.getDishVariant(dishVariantId).dish_id] : null };
    getRestaurant = (dishVariantId) => { return this.getDish(dishVariantId)? this.props.restaurants[this.getDish(dishVariantId).restaurant_id] : null };

    render() {
        return (
            <View style={s.parent}>
                <View style={s.leftPane}>
                    <Text style={s.title}>
                        {(this.getVariant(this.props.orderItem.dish_variant_id)
                        && (this.getDish(this.props.orderItem.dish_variant_id)
                        && (this.getDish(this.props.orderItem.dish_variant_id).dish_variant_ids.length!=1)))
                            ?this.getVariant(this.props.orderItem.dish_variant_id).name+" ":""}
                        {this.getDish(this.props.orderItem.dish_variant_id)
                            ?this.getDish(this.props.orderItem.dish_variant_id).name:"Loading"}
                    </Text>
                    {
                        this.props.addOnLinks.length>0 && this.props.addOnLinks.length<4 &&
                        <View style={s.addOns}>
                            {
                                this.props.addOnLinks.map(addOnLink => {
                                    return(
                                        <View style={s.addOnLink}
                                              key={addOnLink.id}>
                                            <Icon style={s.addOnLinkBullet} name={"circle"} size={5} color={"#F37521"}/>
                                            <Text>{this.props.addOns[addOnLink.add_on_id]?this.props.addOns[addOnLink.add_on_id].name:"Loading"}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    }
                    {
                        this.props.addOnLinks.length>=4 &&
                        <View style={s.addOns}>
                            {
                                this.props.addOnLinks.reduce((array,e)=>(array.includes(e.add_on_type_link_id)?null:array.push(e.add_on_type_link_id),array),[]).map(addOnTypeLinkId => {
                                    let addOnTypeLink = this.props.addOnTypeLinks[addOnTypeLinkId];
                                    return(
                                        <View key={addOnTypeLinkId}>
                                            <Text style={s.addOnType}>{this.props.addOnTypes[addOnTypeLink.add_on_type_id].name}</Text>
                                            {
                                                this.props.addOnLinks.filter(e=>e.add_on_type_link_id===addOnTypeLinkId).map(addOnLink => {
                                                    return(
                                                        <View style={s.addOnLink}
                                                              key={addOnLink.id}>
                                                            <Icon style={s.addOnLinkBullet} name={"circle"} size={5} color={"#F37521"}/>
                                                            <Text>{this.props.addOns[addOnLink.add_on_id]?this.props.addOns[addOnLink.add_on_id].name:"Loading"}</Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>
                    }
                </View>
                <View style={s.rightPane}>
                    {
                        this.getDishVariant(this.props.orderItem.dish_variant_id) && this.props.addOnLinks.length === this.props.orderItem.add_on_link_ids.length &&
                        <Text style={s.price}>₹ {this.props.addOnLinks.reduce((price, addOnLink)=> price+parseFloat(addOnLink.price),parseFloat(this.getDishVariant(this.props.orderItem.dish_variant_id).price))*parseInt(this.props.orderItem.quantity)}</Text>
                    }
                    <View style={s.actions}>
                        <TouchableOpacity
                            onPress={this.props.removeFromCart}
                            style={s.button} >
                            <Icon name={"minus-circle"} size={20} color={"#F37521"}/>
                        </TouchableOpacity>
                        <Text style={s.quantity}> {this.props.orderItem.quantity} </Text>
                        <TouchableOpacity
                            onPress={this.props.addToCart}
                            style={s.button} >
                            <Icon name={"plus-circle"} size={20} color={"#F37521"}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );

    }

}

const s = StyleSheet.create({
    parent: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 15
    },
    button: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    price: {
        padding: 6
    },
    quantity: {
        fontSize: 18
    },
    leftPane: {
        flex: 1,
        padding: 5
    },
    addOns: {
        paddingLeft: 10,
        paddingTop: 10
    },
    rightPane: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addOnLink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    addOnLinkBullet: {
        marginRight: 10
    },
    addOnType: {
        paddingTop: 5,
        paddingBottom: 10,
    }
});

export default CartItem;
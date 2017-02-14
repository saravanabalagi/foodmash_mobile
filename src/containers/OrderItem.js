import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

@connect((store,props) => {
    return {
        addOns: store.addOn.addOns,
        addOnLinks: props.orderItem.add_on_link_ids.map(addOnLinkId => store.addOnLink.addOnLinks[addOnLinkId]).filter(Boolean)
    }
})

class OrderItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.parent}>
                <View style={s.leftPane}>
                    <Text style={s.title}>{this.props.dish.name} </Text>
                    {
                        this.props.addOnLinks.length>0 &&
                        <View style={s.addOns}>
                            {
                                this.props.addOnLinks.map(addOnLink => {
                                    return(
                                        <View style={s.addOnLink}
                                            key={addOnLink.id}>
                                            <Icon style={s.addOnLinkBullet} name={"circle"} size={5} color={"#F37521"}/>
                                            <Text>{this.props.addOns[addOnLink.add_on_id].name}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    }
                </View>
                <View style={s.rightPane}>
                    <Text style={s.price}>₹ {this.props.addOnLinks.reduce((price, addOnLink)=> price+parseFloat(addOnLink.price),parseFloat(this.props.dishVariant.price))*parseInt(this.props.orderItem.quantity)}</Text>
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
    }
});

export default OrderItem;
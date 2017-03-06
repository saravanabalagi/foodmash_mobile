import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import Loading from '../views/Loading';

import {plusOneDishVariantToCart, minusOneDishVariantToCart} from '../reducers/cart/cartActions';
import {getTotal, getTotalItems, submitCart} from '../reducers/cart/cartActions';
import {fetchRestaurant} from '../reducers/restaurant/restaurantActions';

import CartItem from '../containers/CartItem';
import {getErrorDisplayString} from '../helpers/errorHelper';
import SnackBar from 'react-native-snackbar-dialog';

@connect((store) => {
    return {
        signedIn: store.session.jwt!=null,
        restaurantOrders: store.cart.restaurant_orders,
        restaurants: store.restaurant.restaurants,
        inProgress: store.cart.inProgress,
        error: store.cart.error,
        total: getTotal(),
        totalItems: getTotalItems()
    }
})

export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (a,b)=>a!==b,
            sectionHeaderHasChanged: (a,b)=>a!==b,
            getRowData: (dataBlob, sectionId, rowId)=>dataBlob[sectionId + ':' + rowId],
            getSectionData: (dataBlob, sectionId)=>dataBlob[sectionId]
        });
        this.state = {
            dataSource: this.ds.cloneWithRowsAndSections({},[],[])
        }
    }

    componentWillMount = () => { this.componentWillReceiveProps(this.props) };
    componentWillReceiveProps = (nextProps) => {
        let restaurantIds = Object.values(nextProps.restaurantOrders).map(restaurantOrder=>restaurantOrder.restaurant_id);
        restaurantIds.forEach(restaurantId=>{ if(nextProps.restaurants[restaurantId]==null) this.props.dispatch(fetchRestaurant(restaurantId)); });

        if(restaurantIds.every(restaurantId=>nextProps.restaurants[restaurantId]!=null)) {
            let dataBlob = {};
            let orderItemsForRestaurant = {};
            restaurantIds.forEach(restaurantId=>{
                dataBlob[restaurantId] = nextProps.restaurants[restaurantId].name;
                orderItemsForRestaurant[restaurantId] = [];
                nextProps.restaurantOrders[restaurantId].order_items.forEach((orderItem,index)=>{
                    orderItemsForRestaurant[restaurantId].push(index);
                    dataBlob[restaurantId + ':' + index] = orderItem;
                });
            });
            this.setState({dataSource: this.ds.cloneWithRowsAndSections(dataBlob, restaurantIds, Object.values(orderItemsForRestaurant))});
        }

        if(this.props.error!=nextProps.error && nextProps.error!=null)
            SnackBar.show(getErrorDisplayString(nextProps.error),
                { confirmText:"Dismiss", onConfirm: ()=>SnackBar.dismiss()});

    };

    handleAddToCart = (orderItem, restaurantId) => { this.props.dispatch(plusOneDishVariantToCart(orderItem, restaurantId)); };
    handleRemoveFromCart = (orderItem, restaurantId) => { this.props.dispatch(minusOneDishVariantToCart(orderItem, restaurantId)); };

    render() {
        return (
            <View style={s.parent}>
                <View style={s.titleBar}>
                    <View style={s.titleWrapper}>
                        <MaterialIcon style={s.cartIcon} name={"shopping-cart"} size={20} color={"#e16800"}/>
                        <Text style={s.title}>Cart</Text>
                    </View>
                </View>
                { this.props.inProgress && <Loading/> }
                {
                    Object.values(this.props.restaurantOrders).length===0 &&
                    <View style={s.noItemsInCart}>
                        <Icon name={"frown-o"} size={100} color={"#e16800"}/>
                        <Text style={s.cartIsEmpty}>{"Your cart is empty"}</Text>
                        <Text style={s.shouldntBe}>{"but it shouldn't be"}</Text>
                    </View>
                }
                {
                    Object.values(this.props.restaurantOrders).length>0 &&
                    <ListView style={s.scrollableArea}
                              dataSource={this.state.dataSource}
                              renderSectionHeader={sectionData=>{
                                  return <View style={s.restaurantWrapper}>
                                          <Icon name={"angle-right"} size={20} color={"#e16800"}/>
                                          <Text style={s.restaurantName}>{sectionData}</Text>
                                      </View>
                              }}
                              renderRow={(orderItem,sectionId,rowId)=>{
                                  return <CartItem
                                              key={rowId}
                                              addToCart={()=>this.handleAddToCart(orderItem,sectionId)}
                                              removeFromCart={()=>this.handleRemoveFromCart(orderItem,sectionId)}
                                              orderItem={orderItem}/>
                              }}>
                    </ListView>
                }
                {
                    Object.values(this.props.restaurantOrders).length>0 &&
                    <TouchableOpacity
                        style={s.touchableBottomBar}
                        onPress={()=>this.props.dispatch(submitCart())}>
                        <View style={s.proceedButton}>
                            <View style={s.totalWrapper}>
                                <Text style={s.total}> ₹ { this.props.total } </Text>
                                <Text style={s.totalItems}> { this.props.totalItems } {this.props.totalItems>1?"items":"item"} </Text>
                            </View>
                            <View style={s.line} />
                            <View style={s.buttonRight}>
                                <View style={s.proceedWrapper}>
                                    <Text style={s.proceed}> Proceed </Text>
                                    <Text style={s.toPay}> TO PAY </Text>
                                </View>
                                <Icon name={"chevron-circle-right"} size={20} color={"#F37521"}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        flex: 1,
        marginBottom: 80
    },
    titleBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#EEE',
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: { fontSize: 20 },
    cartIcon: { marginRight: 5 },
    scrollableArea: {
        flex: 1,
        padding: [0,10]
    },
    restaurantWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    restaurantName: {
        padding: 10,
        fontSize: 20
    },
    touchableBottomBar: {
        height: 70,
        margin: [0,10],
        borderTopColor: '#BBB',
        borderTopWidth: 1
    },
    proceedButton: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    buttonRight: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    totalWrapper: {
        flex: 2,
        alignItems: 'center'
    },
    proceedWrapper: { paddingRight: 10 },
    proceed: { fontSize: 14 },
    toPay: { fontSize: 16 },
    total: { fontSize: 17 },
    totalItems: { fontSize: 13 },
    line: {
        width: 1,
        height: 50,
        backgroundColor: '#BBB'
    },
    noItemsInCart: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    cartIsEmpty: {
        fontSize: 15,
        marginTop: 20
    },
    shouldntBe: {
        fontSize: 17,
        padding: 5
    }
});
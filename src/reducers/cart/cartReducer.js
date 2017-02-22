export default (state = {
    restaurant_orders: {},
    inProgress: false,
    values: {
        id: null,
        total: null,
        sub_total: null,
        vat: null,
        delivery: null
    },
    error: null
}, action) => {
    switch(action.type) {
        case "FETCH_CART_IN_PROGRESS":
            return {...state,
                inProgress: true };
        case "FETCH_CART_FULFILLED":
            return {...state,
                restaurant_orders: action.payload['restaurant_orders']};
        case "FETCH_CART_FAILED":
            return {...state,
                error: action.payload,
                inProgress: false };

        case "SUBMIT_CART_IN_PROGRESS":
            return {...state,
                inProgress: true };
        case "SUBMIT_CART_FULFILLED":
            return {...state,
                error: null,
                inProgress: false,
                values: action.payload['values'] };
        case "SUBMIT_CART_FAILED":
            return {...state,
                error: action.payload,
                inProgress: false };

        case "RESET_CART":
            return {...state,
                restaurant_orders: [],
                inProgress: false,
                values: {id: null, total: null, sub_total: null, vat: null, delivery: null},
                error: null };
    }
    return {...state,
        restaurant_orders: restaurantOrders(state.restaurant_orders, action)};
}

const restaurantOrders = (state = {}, action) => {
    switch(action.type) {
        case "PLUS_ONE_DISH_VARIANT":
            return {...state,
                [action.restaurantId]: restaurantOrder(state[action.restaurantId], action)};
        case "MINUS_ONE_DISH_VARIANT":
        case "MINUS_ONE_DISH_VARIANT_LENIENT":
            let newRestaurantOrder = restaurantOrder(state[action.restaurantId],action);
                if(newRestaurantOrder.order_items.length === 0)
                    return Object.keys(state).reduce((obj, key) => (
                        key != action.restaurantId
                            ? (obj[key]=state[key],obj)
                            : obj
                    ),{});
                else return {...state,
                    [action.restaurantId]: restaurantOrder(state[action.restaurantId],action) };
    }
    return state;
};

const restaurantOrder = (state = {
    restaurant_id: null,
    order_items: []
}, action) => {
    if(state.id == null) state = {...state, restaurant_id: action.restaurantId};
    switch(action.type) {
        case "PLUS_ONE_DISH_VARIANT":
            let found = state.order_items.filter(orderItem =>
                            checkEqualityOfOrderItemsExceptQuantity(orderItem, action.orderItem)).length;
            if(found==0)
                return {...state,
                    order_items: [...state.order_items, {...action.orderItem, quantity: 1}]};
            else if(found==1)
                return {...state, order_items: state.order_items
                                                    .map(orderItem =>
                                                        checkEqualityOfOrderItemsExceptQuantity(orderItem, action.orderItem)
                                                            ? {...orderItem, quantity: orderItem.quantity+1 || 1}
                                                            : orderItem ) };
            else return state;
        case "MINUS_ONE_DISH_VARIANT":
            let filtered = state.order_items.filter(orderItem =>
                                checkEqualityOfOrderItemsExceptQuantity(orderItem, action.orderItem));
            if(filtered.length == 1)
                if(filtered[0].quantity == 1)
                    return {...state,
                        order_items: state.order_items.filter(orderItem =>
                                        !checkEqualityOfOrderItemsExceptQuantity(orderItem, action.orderItem)) };
                else if(filtered[0].quantity > 1)
                    return {...state, order_items: state.order_items.map(orderItem =>
                        checkEqualityOfOrderItemsExceptQuantity(orderItem, action.orderItem)
                            ? {...orderItem, quantity: orderItem.quantity-1}
                            : orderItem ) };
                else return state;
            else return state;
        case "MINUS_ONE_DISH_VARIANT_LENIENT":
            return {...state, order_items: state.order_items
                                            .reduceRight((found => (orderItems, orderItem) =>
                                                (!found && orderItem.dish_variant_id===action.orderItem.dish_variant_id
                                                    ? (found=true,(orderItem.quantity>1)?orderItems.unshift({...orderItem, quantity: orderItem.quantity-1}):true)
                                                    : orderItems.unshift(orderItem),orderItems)
                                                )(false),[]) };
    }
    return state;
};

let checkEqualityOfOrderItems = (d1, d2) => {
    return checkEqualityOfOrderItemsExceptQuantity(d1,d2)
        && d1.quantity===d2.quantity;
};

let checkEqualityOfOrderItemsExceptQuantity = (d1, d2) => {
    return d1.dish_variant_id === d2.dish_variant_id
        && d1.note === d2.note
        && d1.add_on_link_ids.length === d2.add_on_link_ids.length
        && d2.add_on_link_ids.every(id=>d1.add_on_link_ids.includes(id));
};

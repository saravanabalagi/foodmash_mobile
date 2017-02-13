export default (state = {
    orderItems: [],
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
    const newState = {...state};
    switch(action.type) {
        case "FETCH_CART_IN_PROGRESS": newState.inProgress = true; break;
        case "FETCH_CART_FULFILLED": newState.orderItems = action.payload['order_items'];
            newState.error = null; newState.inProgress = false; break;
        case "FETCH_CART_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "SUBMIT_CART_IN_PROGRESS": newState.inProgress = true; break;
        case "SUBMIT_CART_FULFILLED": newState.error = null; newState.values = action.payload['values']; newState.inProgress = false; break;
        case "SUBMIT_CART_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "PLUS_ONE_DISH_VARIANT":
            let found = newState.orderItems.filter(orderItem => checkEqualityOfOrderItemsExceptQuantity(orderItem, action.orderItem)).length;
            if(found==0) { action.orderItem.quantity = 1; newState.orderItems = [...newState.orderItems, action.orderItem]; }
            else if(found==1) newState.orderItems = newState.orderItems.map(orderItem => checkEqualityOfOrderItemsExceptQuantity(orderItem, action.orderItem)? changeQuantityToOrderItem(orderItem,action,1) :orderItem );
            break;
        case "MINUS_ONE_DISH_VARIANT":
            let filtered = newState.orderItems.filter(orderItem => checkEqualityOfOrderItemsExceptQuantity(orderItem, action.orderItem));
            if(filtered.length == 1)
                if(filtered[0].quantity == 1) newState.orderItems = newState.orderItems.filter(orderItem => !checkEqualityOfOrderItemsExceptQuantity(orderItem, action.orderItem));
                else if(filtered[0].quantity > 1) newState.orderItems = newState.orderItems.map(orderItem => checkEqualityOfOrderItemsExceptQuantity(orderItem, action.orderItem)? changeQuantityToOrderItem(orderItem,action,-1) :orderItem );
            break;
        case "MINUS_ONE_DISH_VARIANT_LENIENT":
            newState.orderItems = newState.orderItems.reduceRight((found => (orderItems, orderItem) => (!found && orderItem.dish_variant_id===action.orderItem.dish_variant_id? (found=true,(orderItem.quantity>1)?orderItems.unshift({...orderItem, quantity: orderItem.quantity-1}):true) : orderItems.unshift(orderItem),orderItems))(false),[]);
            break;

        case "RESET_CART": newState.orderItems = []; newState.inProgress = false;
                            newState.values = {id: null, total: null, sub_total: null, vat: null, delivery: null};
                            newState.error = null; break;
    }

    return newState;
}

let changeQuantityToOrderItem = (state={}, action, change) => {
    const newState = {...state};
    if(newState.quantity === undefined) newState.quantity = 0;
    newState.quantity += change;
    return newState;
};

let checkEqualityOfOrderItems = (d1, d2) => { return checkEqualityOfOrderItemsExceptQuantity(d1,d2) && d1.quantity===d2.quantity; };
let checkEqualityOfOrderItemsExceptQuantity = (d1, d2) => {
    if(d1.dish_variant_id != d2.dish_variant_id) return false;
    if(d1.note != d2.note) return false;
    return d1.add_on_link_ids.length === d2.add_on_link_ids.length && d2.add_on_link_ids.every(id=>d1.add_on_link_ids.includes(id));
};

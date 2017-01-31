export default (state = {
    dishVariants: [],
    combos: [],
    addressId: null,
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
        case "FETCH_CART_FULFILLED":
            if(action.payload.hasOwnProperty('dishVariants')) newState.dishVariants = action.payload['dishVariants'];
            if(action.payload.hasOwnProperty('combos')) newState.combos = action.payload['combos'];
            newState.error = null; newState.inProgress = false; break;
        case "FETCH_CART_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "SUBMIT_ADDRESS_IN_PROGRESS": newState.inProgress = true; break;
        case "SUBMIT_ADDRESS_FULFILLED": newState.error = null; newState.values = action.payload;  newState.inProgress = false; break;
        case "SUBMIT_ADDRESS_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "SUBMIT_CART_IN_PROGRESS": newState.inProgress = true; break;
        case "SUBMIT_CART_FULFILLED": newState.error = null; newState.inProgress = false; break;
        case "SUBMIT_CART_FAILED": newState.error = action.payload; newState.inProgress = false; break;

        case "PLUS_ONE_DISH_VARIANT":
            let found = newState.dishVariants.filter(dishVariant => checkEqualityOfDishVariantsExceptQuantity(dishVariant, action.dishVariant)).length;
            if(found==0) { action.dishVariant.quantity = 1; newState.dishVariants = [...newState.dishVariants, action.dishVariant]; }
            else if(found==1) newState.dishVariants = newState.dishVariants.map(dishVariant => checkEqualityOfDishVariantsExceptQuantity(dishVariant, action.dishVariant)? changeQuantityToDishVariant(dishVariant,action,1) :dishVariant );
            break;
        case "MINUS_ONE_DISH_VARIANT":
            let filtered = newState.dishVariants.filter(dishVariant => checkEqualityOfDishVariantsExceptQuantity(dishVariant, action.dishVariant));
            if(filtered.length == 1)
                if(filtered[0].quantity == 1) newState.dishVariants = newState.dishVariants.filter(dishVariant => !checkEqualityOfDishVariantsExceptQuantity(dishVariant, action.dishVariant));
                else if(filtered[0].quantity > 1) newState.dishVariants = newState.dishVariants.map(dishVariant => checkEqualityOfDishVariantsExceptQuantity(dishVariant, action.dishVariant)? changeQuantityToDishVariant(dishVariant,action,-1) :dishVariant );
            break;

        case "SET_ADDRESS_FOR_CART": newState.addressId = action.addressId; break;

        case "RESET_CART": newState.dishVariants = []; newState.combos = [];
                            newState.addressId = null; newState.inProgress = false;
                            newState.values = {id: null, total: null, sub_total: null, vat: null, delivery: null};
                            newState.error = null; break;
    }

    return newState;
}

let changeQuantityToDishVariant = (state={}, action, change) => {
    const newState = {...state};
    if(newState.quantity === undefined) newState.quantity = 0;
    newState.quantity += change;
    return newState;
};

let checkEqualityOfDishVariants = (d1, d2) => {
    if(checkEqualityOfDishVariantsExceptQuantity(d1,d2) == false) return false;
    else if(d1.quantity != d2.quantity) return false;
    return true;
};

let checkEqualityOfDishVariantsExceptQuantity = (d1, d2) => {
    if(d1.id != d2.id) return false;
    if(d1.ordered.hasOwnProperty('note') && !d2.ordered.hasOwnProperty('note')) return false;
    if(!d1.ordered.hasOwnProperty('note') && d2.ordered.hasOwnProperty('note')) return false;
    if(d1.ordered.hasOwnProperty('note') && d2.ordered.hasOwnProperty('note'))
        if(d1.ordered['note'] != d2.ordered['note']) return false;
    if(d1.ordered.hasOwnProperty('add_ons') && !d2.ordered.hasOwnProperty('add_ons')) return false;
    if(!d1.ordered.hasOwnProperty('add_ons') && d2.ordered.hasOwnProperty('add_ons')) return false;
    if(d1.ordered.hasOwnProperty('add_ons') && d2.ordered.hasOwnProperty('add_ons')) {
        if(d1.ordered['add_ons'].length != d2.ordered['add_ons'].length) return false;
        const a1 = d1.ordered['add_ons'].slice(0).sort();
        const a2 = d2.ordered['add_ons'].slice(0).sort();
        if(a1.length==a2.length && a1.every((v,i)=> v === a2[i]) == false) return false;
    }
    return true;
};

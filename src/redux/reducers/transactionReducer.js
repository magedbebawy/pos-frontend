import {
    CLEAR_TRANS,
    ADD_ITEM,
    REMOVE_ITEM,
    UPDATE_ITEM,
    ADD_DISCOUNT,
    CLEAR_DISCOUNT,
    REMOVE_TAX,
    ADD_TAX
} from '../actions/transactionActions';

import taxes from '../../taxes';

const initialState = {
    items: [],
    total: 0,
    qty: 0,
    payment: {},
    discount: 0,
    taxes: 0,
}

const transactionReducer = (state = initialState, action) => {
    switch(action.type) {
        case CLEAR_TRANS:
            return {
                items: [],
                total: 0,
                qty: 0,
                payment: {},
                discount: 0,
                taxes: 0,
            }            
        case ADD_ITEM:
            console.log('add item');
            return addItem(state, action.payload);
        case REMOVE_ITEM:
            return removeItem(state, action.payload);
        case UPDATE_ITEM:
            return updateItem(state, action.payload.barcode, action.payload.qty);
        case ADD_DISCOUNT:
            return addDiscount(state, action.payload);
        case CLEAR_DISCOUNT:
            return clearDiscount(state);
        case REMOVE_TAX:
            return removeTax(state);
        case ADD_TAX:
            return addTax(state);
        default:
            return state;
    }
}

const searchItems = (state, barcode) => {
    for(let i = 0; i < state.items.length; i++) {
        if(state.items[i].barcode === barcode) {
            return i;
        }
    }
    return null;
};

const addItem = (state, item) => {
    // Search for item in transaction
    const result = searchItems(state, item.barcode);
    console.log('result', result);
    if (result !== null) {
        console.log('item1', item);
        state.items[result].transQty++;
        state.items[result].totalTax += state.items[result].tax;
        state.items[result].totalPrice += state.items[result].price;
    } else {
        const tax = calcTax(item.price, item.taxType);
        item.transQty = 1;
        item.tax = tax;
        item.totalTax = tax;
        item.totalPrice = item.price;
        console.log('item', item);
        state.items.push(item);
    }

    state.taxes = state.items.reduce((acc, currValue) => acc + currValue.totalTax, 0);
    state.total = state.items.reduce((acc, currValue) => acc + currValue.totalPrice, 0) + state.taxes - state.discount;
    state.qty = state.items.reduce((acc, currValue) => acc + currValue.transQty, 0);
    

    return state;
};

const removeItem = (state, barcode) => {
    for(let i = 0; i < state.items.length; i++) {
        if(state.items[i].barcode === barcode) {
            state.items.splice(i,1);
        };
    }

    state.taxes = state.items.reduce((acc, currValue) => acc + currValue.totalTax, 0);
    state.total = state.items.reduce((acc, currValue) => acc + currValue.totalPrice, 0) + state.taxes - state.discount;
    state.qty = state.items.reduce((acc, currValue) => acc + currValue.transQty, 0);

    return state;
}

const updateItem = (state, barcode, qty) => {
    if(qty === 0) return removeItem(state, barcode);
    for(let i = 0; i < state.items.length; i++) {
        if(state.items[i].barcode === barcode) {
            state.items[i].transQty = qty;
            state.items[i].totalTax = (state.items[i].tax * qty);
            state.items[i].totalPrice = (state.items[i].price * qty);
        }
    }

    state.taxes = state.items.reduce((acc, currValue) => acc + currValue.totalTax, 0);
    state.total = state.items.reduce((acc, currValue) => acc + currValue.totalPrice, 0) + state.taxes - state.discount;
    state.qty = state.items.reduce((acc, currValue) => acc + currValue.transQty, 0);

    return state;
}

const addDiscount = (state, amount) => {
    state.total -= amount;
    state.discount += parseFloat(amount);
    console.log('state', state);
    return state;
}

const clearDiscount = (state) => {
    state.discount = 0;
    state.total = state.items.reduce((acc, currValue) => acc + currValue.totalPrice, 0) + state.taxes - state.discount;
    return state;
}

const calcTax = (price, taxType) => {
    for(let i = 0; i < taxes.length; i++) {
        if(taxes[i].name.toLowerCase() === taxType.toLowerCase()) {
            if(taxType.toLowerCase() === 'cigar') {
                return taxes[i].value;
            } else {
                return price * taxes[i].value;
            }
        }
    }
    return 0;
}

const removeTax = (state) => {
    state.taxes = 0;
    state.total = state.items.reduce((acc, currValue) => acc + currValue.totalPrice, 0);
    return state;
}

const addTax = (state) => {
    state.taxes = state.items.reduce((acc, currValue) => acc + currValue.totalTax, 0);
    state.total = state.items.reduce((acc, currValue) => acc + currValue.totalPrice, 0) + state.taxes - state.discount;
    return state;
}

export default transactionReducer;
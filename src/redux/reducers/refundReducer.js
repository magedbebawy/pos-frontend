import {
    ADD_ITEM_REFUND,
    REMOVE_ITEM_REFUND,
    UPDATE_ITEM_REFUND,
    CLEAR_REFUND
} from '../actions/refundActions';

const initialState = {
    items: [],
    total: 0,
    qty: 0,
    payment: {},
    discount: 0,
    taxes: 0,
};


const refundReducer = (state = initialState, action) => {
    switch(action.type){
        case CLEAR_REFUND:
            return {
                items: [],
                total: 0,
                qty: 0,
                payment: {},
                discount: 0,
                taxes: 0,
            };
        default:
            return state;
    }
}

const addItem = (state, item) => {
    // Search for item in transaction
    const result = searchItems(state, item.barcode);
    if (result !== null) {
        state.items[result].transQty++;
        state.items[result].totalTax -= state.items[result].tax;
        state.items[result].totalPrice -= state.items[result].price;
    } else {
        const tax = calcTax(item.price, item.taxType) * -1;
        item.transQty = 1;
        item.tax = tax;
        item.totalTax = tax;
        item.totalPrice = item.price * -1;
        console.log('item', item);
        state.items.push(item);
    }

    state.taxes = state.items.reduce((acc, currValue) => acc - currValue.totalTax, 0);
    state.total = state.items.reduce((acc, currValue) => acc - currValue.totalPrice, 0) + state.taxes - state.discount;
    state.qty = state.items.reduce((acc, currValue) => acc - currValue.transQty, 0);
    

    return state;
}

const searchItems = (state, barcode) => {
    for(let i = 0; i < state.items.length; i++) {
        if(state.items[i].barcode === barcode) {
            return i;
        }
    }
    return null;
};

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

module.exports = refundReducer;

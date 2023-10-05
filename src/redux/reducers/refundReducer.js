import {
    ADD_ITEM_REFUND,
    REMOVE_ITEM_REFUND,
    UPDATE_ITEM_REFUND,
    CLEAR_REFUND
} from '../actions/refundActions';
import taxes from '../../taxes';

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
        case ADD_ITEM_REFUND:
            return addItem(state, action.payload);
        case UPDATE_ITEM_REFUND:
            return updateItem(state, action.payload.barcode, action.payload.qty);
        case REMOVE_ITEM_REFUND:
            return removeItem(state, action.payload);
        default:
            return state;
    }
}

const addItem = (state, item) => {
    // Search for item in transaction
    const result = searchItems(state, item.barcode);
    if (result !== null) {
        state.items[result].transQty++;
        state.items[result].totalTax -= (state.items[result].tax * -1);
        state.items[result].totalPrice -= state.items[result].price;
    } else {
        const tax = calcTax(item.price, item.taxType);
        item.transQty = 1;
        item.tax = tax;
        item.totalTax = tax * -1;
        item.totalPrice = item.price * -1;
        state.items.push(item);
    }

    state.taxes = state.items.reduce((acc, currValue) => acc + currValue.totalTax, 0);
    state.total = state.items.reduce((acc, currValue) => acc + currValue.totalPrice, 0) + state.taxes - state.discount;
    state.qty = state.items.reduce((acc, currValue) => acc + currValue.transQty, 0);
    

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
};

const updateItem = (state, barcode, qty) => {
    for(let i=0; i<state.items.length; i++) {
        if(state.items[i].barcode === barcode) {
            state.items[i].transQty = qty;
            state.items[i].totalPrice = (state.items[i].price * qty) * -1;
            state.items[i].totalTax = (state.items[i].tax * qty) * -1;
            state.taxes = state.items.reduce((acc, currValue) => acc + currValue.totalTax, 0);
            state.total = state.items.reduce((acc, currValue) => acc + currValue.totalPrice, 0) + state.taxes - state.discount;
            state.qty = state.items.reduce((acc, currValue) => acc + currValue.transQty, 0);
        }
    }

    return state;
};

const removeItem = (state, barcode) => {
    for(let i=0; i<state.items.length; i++){
        if(state.items[i].barcode === barcode) {
            state.items.splice(i,1);
        }
    }

    state.taxes = state.items.reduce((acc, currValue) => acc + currValue.totalTax, 0);
    state.total = state.items.reduce((acc, currValue) => acc + currValue.totalPrice, 0) + state.taxes - state.discount;
    state.qty = state.items.reduce((acc, currValue) => acc + currValue.transQty, 0);

    return state;
}

export default refundReducer;

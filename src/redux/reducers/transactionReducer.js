import {
    CLEAR_TRANS,
    ADD_ITEM,
    REMOVE_ITEM,
    UPDATE_ITEM
} from '../actions/transactionActions';

const initialState = {
    items: [],
    total: 0,
    qty: 0,
    payment: {}
}

const transactionReducer = (state = initialState, action) => {
    switch(action.type) {
        case CLEAR_TRANS:
            return {
                items: [],
                total: 0,
                qty: 0,
                payment: {}
            }
        case ADD_ITEM:
            console.log('add item');
            return addItem(state, action.payload);
        case REMOVE_ITEM:
            return removeItem(state, action.payload);
        case UPDATE_ITEM:
            return updateItem(state, action.payload.barcode, action.payload.qty);
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
        state.items[result].totalPrice += state.items[result].price;
    } else {
        item.transQty = 1;
        item.totalPrice = item.price;
        console.log('item', item);
        state.items.push(item);
    }

    state.total = state.items.reduce((acc, currValue) => acc + currValue.totalPrice, 0);
    state.qty = state.items.reduce((acc, currValue) => acc + currValue.transQty, 0);

    return state;
};

const removeItem = (state, barcode) => {
    for(let i = 0; i < state.items.length; i++) {
        if(state.items[i].barcode == barcode) {
            state.items.splice(i,1);
        };
    }

    state.total = state.items.reduce((acc, currValue) => acc + currValue.totalPrice, 0);
    state.qty = state.items.reduce((acc, currValue) => acc + currValue.transQty, 0);

    return state;
}

const updateItem = (state, barcode, qty) => {
    if(qty == 0) return removeItem(state, barcode);
    for(let i = 0; i < state.items.length; i++) {
        if(state.items[i].barcode = barcode) {
            state.items[i].transQty = qty;
            state.items[i].totalPrice = (state.items[i].price * qty);
        }
    }

    state.total = state.items.reduce((acc, currValue) => acc + currValue.totalPrice, 0);
    state.qty = state.items.reduce((acc, currValue) => acc + currValue.transQty, 0);

    return state;
}

export default transactionReducer;
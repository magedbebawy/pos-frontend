const CLEAR_TRANS = 'CLEAR TRANS';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const ADD_DISCOUNT = "ADD_DISCOUNT";
const CLEAR_DISCOUNT = "CLEAR_DISCOUNT";

function clearTrans() {
    return {
        type: CLEAR_TRANS
    }
};

function addItem(item) {
    return {
        type: ADD_ITEM,
        payload: item
    }
};

function removeItem(barcode) {
    return {
        type: REMOVE_ITEM,
        payload: barcode
    }
};

function updateItem(barcode, qty) {
    return {
        type: UPDATE_ITEM,
        payload: {
            barcode, 
            qty
        }
    }
};

function addDiscount(amount) {
    return {
        type: ADD_DISCOUNT,
        payload: amount
    }
};

function clearDiscount() {
    return {
        type: CLEAR_DISCOUNT,
    }
};

module.exports = {
    CLEAR_TRANS,
    ADD_ITEM,
    REMOVE_ITEM,
    UPDATE_ITEM,
    ADD_DISCOUNT,
    CLEAR_DISCOUNT,
    clearTrans,
    addItem,
    removeItem,
    updateItem,
    addDiscount,
    clearDiscount
};
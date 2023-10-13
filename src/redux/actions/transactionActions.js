const CLEAR_TRANS = 'CLEAR TRANS';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const ADD_DISCOUNT = "ADD_DISCOUNT";
const CLEAR_DISCOUNT = "CLEAR_DISCOUNT";
const REMOVE_TAX = "REMOVE_TAX";
const ADD_TAX = "ADD_TAX";
const ADD_TRANS = "ADD_TRANS";

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

function removeTax() {
    return {
        type: REMOVE_TAX,
    }
};

function addTax() {
    return {
        type: ADD_TAX,
    }
};

function addTrans(trans) {
    return {
        type: ADD_TRANS,
        payload: trans
    }
}

module.exports = {
    CLEAR_TRANS,
    ADD_ITEM,
    REMOVE_ITEM,
    UPDATE_ITEM,
    ADD_DISCOUNT,
    CLEAR_DISCOUNT,
    REMOVE_TAX,
    ADD_TAX,
    ADD_TRANS,
    clearTrans,
    addItem,
    removeItem,
    updateItem,
    addDiscount,
    clearDiscount,
    removeTax,
    addTax,
    addTrans
};
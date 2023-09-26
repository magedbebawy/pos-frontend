const CLEAR_TRANS = 'CLEAR TRANS';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';

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
}

module.exports = {
    CLEAR_TRANS,
    ADD_ITEM,
    REMOVE_ITEM,
    UPDATE_ITEM,
    clearTrans,
    addItem,
    removeItem,
    updateItem
};
const CLEAR_TRANS = 'CLEAR TRANS';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';

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

function removeItem(itemNum) {
    return {
        type: REMOVE_ITEM,
        payload: itemNum
    }
};

module.exports = {
    CLEAR_TRANS,
    ADD_ITEM,
    REMOVE_ITEM,
    clearTrans,
    addItem,
    removeItem
};
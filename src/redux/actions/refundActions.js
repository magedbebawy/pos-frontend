const ADD_ITEM_REFUND = "ADD_ITEM_REFUND";
const REMOVE_ITEM_REFUND = "REMOVE_ITEM_REFUND";
const UPDATE_ITEM_REFUND = "UPDATE_ITEM_REFUND";
const CLEAR_REFUND = "CLEAR_REFUND";


const addItemRefund = (item) => {
    return {
        type: ADD_ITEM_REFUND,
        payload: item,
    }
}

const removeItemRefund = (barcode) => {
    return {
        type: REMOVE_ITEM_REFUND,
        payload: barcode,
    }
}

const updateItemRefund = (barcode, qty) => {
    return {
        type: UPDATE_ITEM_REFUND,
        payload: {
            barcode, 
            qty
        }
    }
}

const clearRefund = () => {
    return {
        type: CLEAR_REFUND,
    }
}

module.exports = {
    ADD_ITEM_REFUND,
    REMOVE_ITEM_REFUND,
    UPDATE_ITEM_REFUND,
    CLEAR_REFUND,
    addItemRefund,
    removeItemRefund,
    updateItemRefund,
    clearRefund
}
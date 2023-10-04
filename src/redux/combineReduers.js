import { combineReducers } from 'redux';
import transactionReducer from './reducers/transactionReducer';
import userReducer from './reducers/userReducer';
import refundReducer from './reducers/refundReducer';

const rootReducer = combineReducers({
    user: userReducer,
    transaction: transactionReducer,
    refund: refundReducer
});


export default rootReducer;
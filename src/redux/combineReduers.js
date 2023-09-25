import { combineReducers } from 'redux';
import transactionReducer from './reducers/transactionReducer';
import userReducer from './reducers/userReducer';


const rootReducer = combineReducers({
    user: userReducer,
    transaction: transactionReducer
});


export default rootReducer;
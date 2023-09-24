import { createStore } from 'redux';
import rootReducer from './combineReduers';

const store = createStore(rootReducer);

export default store;
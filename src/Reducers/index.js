// Redux store
import { combineReducers, createStore } from 'redux';
import userReducer from './user';
import { counterReducer, measureReducer, measurmentReducer } from './measure';

const reducers = combineReducers({
  user: userReducer,
  measure: measureReducer,
  measurments: measurmentReducer,
  count: counterReducer,
});
const store = createStore(reducers);

export default store;

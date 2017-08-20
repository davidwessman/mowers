import { combineReducers } from 'redux';
import customers from 'reducers/customers';
import mowers from 'reducers/mowers';

const rootReducer = combineReducers({
  customers,
  mowers,
});

export default rootReducer;

import { combineReducers } from 'redux';
import customers from 'reducers/customers';
import mowers from 'reducers/mowers';
import jobs from 'reducers/jobs';

const rootReducer = combineReducers({
  customers,
  jobs,
  mowers,
});

export default rootReducer;

import * as types from 'constants/types';
import CustomerApi from 'services/api/customer';
import MowerApi from 'services/api/mower';
import JobApi from 'services/api/job';

const apiService = () => next => (action) => {
  next(action);
  switch (action.type) {
    case types.SEARCH_CUSTOMER_DATA:
      CustomerApi.search(next, action);
      break;

    case types.CREATE_CUSTOMER:
      CustomerApi.create(next, action);
      break;

    case types.UPDATE_CUSTOMER:
      CustomerApi.update(next, action);
      break;

    case types.SELECT_CUSTOMER:
      MowerApi.customerSelected(next, action);
      break;

    case types.CREATE_MOWER:
      MowerApi.create(next, action);
      break;

    case types.UPDATE_MOWER:
      MowerApi.update(next, action);
      break;

    case types.SELECT_MOWER:
      JobApi.mowerSelected(next, action);
      break;

    case types.CREATE_JOB:
      JobApi.create(next, action);
      break;

    default:
      break;
  }
};

export default apiService;

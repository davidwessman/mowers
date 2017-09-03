import * as types from 'constants/types';

const getRequestData = (method = 'get', body = {}) => {
  const tokenElem = document.querySelector('meta[name="csrf-token"]');
  const token = tokenElem && tokenElem.getAttribute('content');

  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': token,
    },
    body,
    credentials: 'same-origin',
  };
};

const apiService = () => next => (action) => {
  next(action);
  switch (action.type) {
    case types.SEARCH_CUSTOMER_DATA:
      if (action.data === undefined || Object.keys(action.data).length === 0) return;
      fetch(
        '/api/search/customer',
        getRequestData(
          'post',
          JSON.stringify({
            search: action.data,
          }),
        ),
      )
      .then(response => response.json())
      .then((data) => {
        next({
          type: types.GET_CUSTOMER_DATA_RECEIVED,
          data,
        });
      });
      break;

    case types.CREATE_CUSTOMER:
      fetch(
        '/api/customers',
        getRequestData(
          'post',
          JSON.stringify({
            customer: action.data,
          }),
        ),
      )
      .then(response => response.json())
      .then((data) => {
        if (data.errors !== undefined) {
          next({
            type: types.CREATE_CUSTOMER_ERROR,
            errors: data.errors,
          });
        } else {
          next({
            type: types.CREATE_CUSTOMER_SUCCESS,
            data,
          });
        }
      });
      break;

    case types.UPDATE_CUSTOMER:
      fetch(
        `/api/customers/${action.data.id}`,
        getRequestData(
          'PATCH',
          JSON.stringify({
            customer: action.data,
          }),
        ),
      )
      .then(response => response.json())
      .then((data) => {
        if (data.errors !== undefined) {
          next({
            type: types.UPDATE_CUSTOMER_ERROR,
            errors: data.errors,
          });
        } else {
          next({
            type: types.UPDATE_CUSTOMER_SUCCESS,
            data,
          });
        }
      });
      break;

    case types.CREATE_MOWER:
      fetch(
        '/api/mowers',
        getRequestData(
          'post',
          JSON.stringify({
            mower: action.data,
          }),
        ),
      )
      .then(response => response.json())
      .then((data) => {
        if (data.errors !== undefined) {
          next({
            type: types.CREATE_MOWER_ERROR,
            errors: data.errors,
          });
        } else {
          next({
            type: types.CREATE_MOWER_SUCCESS,
            data,
          });
        }
      });
      break;

    case types.UPDATE_MOWER:
      fetch(
        `/api/mowers/${action.data.id}`,
        getRequestData(
          'PATCH',
          JSON.stringify({
            mower: action.data,
          }),
        ),
      )
      .then(response => response.json())
      .then((data) => {
        if (data.errors !== undefined) {
          next({
            type: types.UPDATE_MOWER_ERROR,
            errors: data.errors,
          });
        } else {
          next({
            type: types.UPDATE_MOWER_SUCCESS,
            data,
          });
        }
      });
      break;
    case types.SELECT_CUSTOMER:
      if (action.data === undefined) return;
      fetch(
        '/api/mowers/customer',
        getRequestData(
          'post',
          JSON.stringify({
            customer: action.data.id,
          }),
        ),
      )
      .then(response => response.json())
      .then((data) => {
        next({
          type: types.GET_MOWERS_RECEIVED,
          data,
        });
      });
      break;

    default:
      break;
  }
};

export default apiService;

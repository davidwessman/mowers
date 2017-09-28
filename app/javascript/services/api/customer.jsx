import * as types from 'constants/types';
import getRequestData from 'services/request';

export default class CustomerApi {
  static search(next, action) {
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
  }

  static create(next, action) {
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
  }

  static update(next, action) {
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
  }
}

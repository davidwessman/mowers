import * as types from 'constants/types';
import getRequestData from 'services/request';

export default class MowerApi {
  static create(next, action) {
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
  }

  static update(next, action) {
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
  }

  static customerSelected(next, action) {
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
  }
}

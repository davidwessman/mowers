import * as types from 'constants/types';
import getRequestData from 'services/request';

export default class JobApi {
  static mowerSelected(next, action) {
    if (action.data === undefined) return;
    fetch(
      '/api/jobs/mower',
      getRequestData(
        'post',
        JSON.stringify({
          mower: action.data.id,
        }),
      ),
    )
    .then(response => response.json())
    .then((data) => {
      next({
        type: types.GET_JOBS_RECEIVED,
        data,
      });
    });
  }

  static create(next, action) {
    if (action.data.mower_id === undefined) return;
    fetch(
      '/api/jobs',
      getRequestData(
        'post',
        JSON.stringify({
          mower_id: action.data.mower_id,
        }),
      ),
    )
    .then(response => response.json())
    .then((data) => {
      if (data.errors !== undefined) {
        next({
          type: types.CREATE_JOB_ERROR,
          errors: data.errors,
        });
      } else {
        next({
          type: types.CREATE_JOB_SUCCESS,
          data,
        });
      }
    });
  }
}

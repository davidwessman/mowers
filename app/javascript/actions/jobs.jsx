import * as types from 'constants/types';

export function newJobSubmit(event, mower) {
  console.log('here!');
  event.preventDefault();
  return {
    type: types.CREATE_JOB,
    data: {
      mower_id: mower,
    },
  };
}

import * as types from 'constants/types';

export function selectJob(data) {
  return {
    type: types.SELECT_JOB,
    data,
  };
}

export function onJobDeselect() {
  return {
    type: types.DESELECT_JOB,
  };
}

export function editJob() {
  return {
    type: types.EDIT_JOB,
  };
}

export function newJobSubmit(event, data, customer) {
  event.preventDefault();
  return {
    type: types.CREATE_JOB,
    data: {
      ...data,
      customer_id: customer,
    },
  };
}

export function editJobSubmit(event, data) {
  event.preventDefault();
  return {
    type: types.UPDATE_JOB,
    data,
  };
}

export function newJobInputChange(event) {
  return {
    type: types.NEW_JOB_INPUT_CHANGE,
    event,
  };
}

export function editJobInputChange(event) {
  return {
    type: types.EDIT_JOB_INPUT_CHANGE,
    event,
  };
}

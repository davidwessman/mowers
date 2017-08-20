import * as types from 'constants/types';

export function selectMower(data) {
  return {
    type: types.SELECT_MOWER,
    data,
  };
}

export function onMowerDeselect() {
  return {
    type: types.DESELECT_MOWER,
  };
}

export function editMower() {
  return {
    type: types.EDIT_MOWER,
  };
}

export function newMowerSubmit(event, data, customer) {
  event.preventDefault();
  return {
    type: types.CREATE_MOWER,
    data: {
      ...data,
      customer_id: customer,
    },
  };
}

export function editMowerSubmit(event, data) {
  event.preventDefault();
  return {
    type: types.UPDATE_MOWER,
    data,
  };
}

export function newMowerInputChange(event) {
  return {
    type: types.NEW_MOWER_INPUT_CHANGE,
    event,
  };
}

export function newMowerSearch(data) {
  return {
    type: types.SEARCH_MOWER_DATA,
    data,
  };
}

export function editMowerInputChange(event) {
  return {
    type: types.EDIT_MOWER_INPUT_CHANGE,
    event,
  };
}

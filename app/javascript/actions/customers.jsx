import * as types from 'constants/types';

export function selectCustomer(data) {
  return {
    type: types.SELECT_CUSTOMER,
    data,
  };
}

export function onCustomerDeselect() {
  return {
    type: types.DESELECT_CUSTOMER,
  };
}

export function editCustomer() {
  return {
    type: types.EDIT_CUSTOMER,
  };
}

export function newCustomerSubmit(event, data) {
  event.preventDefault();
  return {
    type: types.CREATE_CUSTOMER,
    data,
  };
}

export function editCustomerSubmit(event, data) {
  event.preventDefault();
  return {
    type: types.UPDATE_CUSTOMER,
    data,
  };
}

export function newCustomerInputChange(event) {
  return {
    type: types.NEW_USER_INPUT_CHANGE,
    event,
  };
}

export function newCustomerSearch(data) {
  return {
    type: types.SEARCH_CUSTOMER_DATA,
    data,
  };
}

export function editCustomerInputChange(event) {
  return {
    type: types.EDIT_USER_INPUT_CHANGE,
    event,
  };
}

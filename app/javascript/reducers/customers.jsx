import * as types from 'constants/types';
import * as states from 'constants/states';

const initialCustomer = {
  data: {},
  errors: {},
  state: states.NEW,
};

const initialState = {
  all: [],
  customer: initialCustomer,
};

function inputChange(event, data) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  const newData = Object.assign({}, data);
  newData[name] = value;

  return newData;
}

function customer(state = initialCustomer, action) {
  switch (action.type) {
    case types.SELECT_CUSTOMER:
      return Object.assign({}, state, {
        data: action.data,
        state: states.SELECTED,
      });
    case types.DESELECT_CUSTOMER:
      return Object.assign({}, state, {
        data: {},
        edit_data: {},
        state: states.NEW,
      });
    case types.CREATE_CUSTOMER_ERROR:
      return Object.assign({}, state, {
        state: states.NEW,
        errors: action.errors,
      });
    case types.CREATE_CUSTOMER_SUCCESS:
      return Object.assign({}, state, {
        state: states.SELECTED,
        errors: {},
        data: action.data,
      });
    case types.UPDATE_CUSTOMER_ERROR:
      return Object.assign({}, state, {
        state: states.NEW,
        errors: action.errors,
      });
    case types.UPDATE_CUSTOMER_SUCCESS:
      return Object.assign({}, state, {
        state: states.SELECTED,
        errors: {},
        data: action.data,
      });
    case types.EDIT_CUSTOMER:
      return Object.assign({}, state, {
        state: states.EDIT,
        edit_data: state.data,
      });
    case types.NEW_USER_INPUT_CHANGE:
      return Object.assign({}, state, {
        data: inputChange(action.event, state.data),
        state: states.NEW,
      });
    case types.EDIT_USER_INPUT_CHANGE:
      return Object.assign({}, state, {
        edit_data: inputChange(action.event, state.edit_data),
      });
    default:
      return state;
  }
}

export default function customers(state = initialState, action) {
  switch (action.type) {
    case types.GET_CUSTOMER_DATA_RECEIVED:
      return Object.assign({}, state, {
        all: action.data,
      });

    case types.CREATE_CUSTOMER_ERROR:
    case types.CREATE_CUSTOMER_SUCCESS:
    case types.DESELECT_CUSTOMER:
    case types.EDIT_CUSTOMER:
    case types.EDIT_USER_INPUT_CHANGE:
    case types.NEW_USER_INPUT_CHANGE:
    case types.SELECT_CUSTOMER:
    case types.UPDATE_CUSTOMER_ERROR:
    case types.UPDATE_CUSTOMER_SUCCESS:
      return Object.assign({}, state, {
        customer: customer(state.customer, action),
      });

    default:
      return state;
  }
}

import * as types from 'constants/types';
import * as states from 'constants/states';

const initialMower = {
  data: {},
  errors: {},
  state: states.NEW,
};

const initialState = {
  all: [],
  mower: initialMower,
};

function inputChange(event, data) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  const newData = Object.assign({}, data);
  newData[name] = value;

  return newData;
}

function mower(state = initialMower, action) {
  switch (action.type) {
    case types.SELECT_MOWER:
      return Object.assign({}, state, {
        data: action.data,
        state: states.SELECTED,
      });
    case types.DESELECT_CUSTOMER:
    case types.DESELECT_MOWER:
      return Object.assign({}, state, {
        data: {},
        edit_data: {},
        state: states.NEW,
      });
    case types.CREATE_MOWER_ERROR:
      return Object.assign({}, state, {
        state: states.NEW,
        errors: action.errors,
      });
    case types.CREATE_MOWER_SUCCESS:
      return Object.assign({}, state, {
        state: states.SELECTED,
        errors: {},
        data: action.data,
      });
    case types.UPDATE_MOWER_ERROR:
      return Object.assign({}, state, {
        state: states.NEW,
        errors: action.errors,
      });
    case types.UPDATE_MOWER_SUCCESS:
      return Object.assign({}, state, {
        state: states.SELECTED,
        errors: {},
        data: action.data,
      });
    case types.EDIT_MOWER:
      return Object.assign({}, state, {
        state: states.EDIT,
        edit_data: state.data,
      });
    case types.NEW_MOWER_INPUT_CHANGE:
      return Object.assign({}, state, {
        data: inputChange(action.event, state.data),
        state: states.NEW,
      });
    case types.EDIT_MOWER_INPUT_CHANGE:
      return Object.assign({}, state, {
        edit_data: inputChange(action.event, state.edit_data),
        state: states.EDIT,
      });
    default:
      return state;
  }
}

export default function mowers(state = initialState, action) {
  switch (action.type) {
    case types.GET_MOWERS_RECEIVED:
      return Object.assign({}, state, {
        all: action.data,
      });

    case types.CREATE_MOWER_ERROR:
    case types.CREATE_MOWER_SUCCESS:
    case types.DESELECT_MOWER:
    case types.DESELECT_CUSTOMER:
    case types.EDIT_MOWER:
    case types.EDIT_MOWER_INPUT_CHANGE:
    case types.NEW_MOWER_INPUT_CHANGE:
    case types.SELECT_MOWER:
    case types.UPDATE_MOWER_ERROR:
    case types.UPDATE_MOWER_SUCCESS:
      return Object.assign({}, state, {
        mower: mower(state.mower, action),
      });

    default:
      return state;
  }
}

import * as types from 'constants/types';
import * as states from 'constants/states';

const initialJob = {
  data: {},
  errors: {},
  state: states.NEW,
};

const initialState = {
  all: [],
  job: initialJob,
};

function inputChange(event, data) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  const newData = Object.assign({}, data);
  newData[name] = value;

  return newData;
}

function job(state = initialJob, action) {
  switch (action.type) {
    case types.SELECT_JOB:
      return Object.assign({}, state, {
        data: action.data,
        state: states.SELECTED,
      });
    case types.DESELECT_CUSTOMER:
    case types.DESELECT_JOB:
      return Object.assign({}, state, {
        data: {},
        edit_data: {},
        state: states.NEW,
      });
    case types.CREATE_JOB_ERROR:
      return Object.assign({}, state, {
        state: states.NEW,
        errors: action.errors,
      });
    case types.CREATE_JOB_SUCCESS:
      return Object.assign({}, state, {
        state: states.SELECTED,
        errors: {},
        data: action.data,
      });
    case types.UPDATE_JOB_ERROR:
      return Object.assign({}, state, {
        state: states.NEW,
        errors: action.errors,
      });
    case types.UPDATE_JOB_SUCCESS:
      return Object.assign({}, state, {
        state: states.SELECTED,
        errors: {},
        data: action.data,
      });
    case types.EDIT_JOB:
      return Object.assign({}, state, {
        state: states.EDIT,
        edit_data: state.data,
      });
    case types.NEW_JOB_INPUT_CHANGE:
      return Object.assign({}, state, {
        data: inputChange(action.event, state.data),
        state: states.NEW,
      });
    case types.EDIT_JOB_INPUT_CHANGE:
      return Object.assign({}, state, {
        edit_data: inputChange(action.event, state.edit_data),
        state: states.EDIT,
      });
    default:
      return state;
  }
}

export default function jobs(state = initialState, action) {
  switch (action.type) {
    case types.GET_JOBS_RECEIVED:
      return Object.assign({}, state, {
        all: action.data,
      });

    case types.CREATE_JOB_ERROR:
    case types.CREATE_JOB_SUCCESS:
    case types.DESELECT_JOB:
    case types.DESELECT_CUSTOMER:
    case types.EDIT_JOB:
    case types.EDIT_JOB_INPUT_CHANGE:
    case types.NEW_JOB_INPUT_CHANGE:
    case types.SELECT_JOB:
    case types.UPDATE_JOB_ERROR:
    case types.UPDATE_JOB_SUCCESS:
      return Object.assign({}, state, {
        job: job(state.job, action),
      });

    default:
      return state;
  }
}

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
    case types.DESELECT_CUSTOMER:
    case types.DESELECT_MOWER:
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
    case types.DESELECT_MOWER:
    case types.DESELECT_CUSTOMER:
      return Object.assign({}, state, {
        job: job(state.job, action),
      });

    default:
      return state;
  }
}

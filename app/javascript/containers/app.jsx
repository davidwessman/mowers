import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as customerActions from 'actions/customers';
import * as mowerActions from 'actions/mowers';
import * as jobActions from 'actions/jobs';
import Select from 'containers/select';
import Job from 'components/jobs/job';

const App = ({ customers, jobs, mowers, actions }) => (
  <div className="tile is-ancestor is-vertical">
    <Select
      actions={actions}
      customers={customers}
      jobs={jobs}
      mowers={mowers}
      status={status}
    />
    <Job
      actions={actions.jobs}
      mower={mowers.mower}
      job={jobs.job}
    />
  </div>
);

App.propTypes = {
  actions: PropTypes.shape().isRequired,
  customers: PropTypes.shape().isRequired,
  jobs: PropTypes.shape().isRequired,
  mowers: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  customers: state.customers,
  jobs: state.jobs,
  mowers: state.mowers,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    customers: bindActionCreators(customerActions, dispatch),
    jobs: bindActionCreators(jobActions, dispatch),
    mowers: bindActionCreators(mowerActions, dispatch),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

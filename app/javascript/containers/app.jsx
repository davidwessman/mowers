import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CustomerTable from 'components/customers/table';
import Customer from 'components/customers/customer';
import Mower from 'components/mowers/mower';
import * as customerActions from 'actions/customers';
import * as mowerActions from 'actions/mowers';

const App = ({ customers, mowers, actions }) => (
  <div className="tile is-ancestor is-vertical">
    <div className="tile is-parent">
      <Customer customer={customers.customer} actions={actions.customers} />
      <CustomerTable
        actions={actions.customers}
        customers={customers.all}
        state={customers.customer.state}
      />
    </div>
    <div className="tile is-parent is-12">
      <Mower
        mower={mowers.mower}
        actions={actions.mowers}
        customer={customers.customer.data.id}
        customerState={customers.customer.state}
      />
    </div>
  </div>
);

App.propTypes = {
  customers: PropTypes.shape().isRequired,
  mowers: PropTypes.shape().isRequired,
  actions: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  customers: state.customers,
  mowers: state.mowers,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    customers: bindActionCreators(customerActions, dispatch),
    mowers: bindActionCreators(mowerActions, dispatch),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CustomerTable from 'components/customers/table';
import Customer from 'components/customers/customer';
import * as customerActions from 'actions/customers';

const App = ({ customers, actions }) => (
  <div className="columns">
    <Customer customer={customers.customer} actions={actions} />
    <CustomerTable
      actions={actions}
      customers={customers.all}
      state={customers.customer.state}
    />
  </div>
);

App.propTypes = {
  customers: PropTypes.shape().isRequired,
  actions: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  customers: state.customers,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(customerActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

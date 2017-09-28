import React from 'react';
import PropTypes from 'prop-types';
import CustomerTable from 'components/customers/table';
import Customer from 'components/customers/customer';

const SelectCustomer = ({ all, single, actions, state }) => (
  <div className="tile">
    <div className="tile is-parent is-4">
      <Customer customer={single} actions={actions} />
    </div>
    <div className="tile is-parent">
      <CustomerTable
        actions={actions}
        customers={all}
        state={state}
      />
    </div>
  </div>
);

SelectCustomer.propTypes = {
  actions: PropTypes.shape().isRequired,
  all: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  single: PropTypes.shape().isRequired,
  state: PropTypes.string.isRequired,
};

export default SelectCustomer;

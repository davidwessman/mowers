import React from 'react';
import PropTypes from 'prop-types';
import CustomerTable from 'components/customers/table';
import Customer from 'components/customers/customer';
import Mower from 'components/mowers/mower';
import MowerTable from 'components/mowers/table';
import * as states from 'constants/states';

class Select extends React.Component {
  constructor() {
    super();

    this.picker = this.picker.bind(this);
  }


  picker() {
    const customers = this.props.customers;
    const mowers = this.props.mowers;
    const actions = this.props.actions;
    return (
      <div className="tile is-vertical">
        <div className="tile">
          <div className="tile is-parent is-4">
            <Customer customer={customers.customer} actions={actions.customers} />
          </div>
          <div className="tile is-parent">
            <CustomerTable
              actions={actions.customers}
              customers={customers.all}
              state={customers.customer.state}
            />
          </div>
        </div>
        <div className="tile">
          <div className="tile is-parent is-4">
            <Mower
              mower={mowers.mower}
              actions={actions.mowers}
              customer={customers.customer.data.id}
              customerState={customers.customer.state}
            />
          </div>
          <div className="tile is-parent">
            <MowerTable
              mowers={mowers.all}
              actions={actions.mowers}
              mowerState={mowers.mower.state}
              customerState={customers.customer.state}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const customers = this.props.customers;
    const mowers = this.props.mowers;
    const actions = this.props.actions;

    if (customers.customer.state === states.SELECTED &&
        mowers.mower.state === states.SELECTED) {
      return (
        <div className="tile">
          <div className="tile is-parent">
            <Customer customer={customers.customer} actions={actions.customers} />
          </div>
          <div className="tile is-parent">
            <Mower
              mower={mowers.mower}
              actions={actions.mowers}
              customer={customers.customer.data.id}
              customerState={customers.customer.state}
            />
          </div>
        </div>
      );
    }

    return this.picker();
  }
}

Select.propTypes = {
  customers: PropTypes.shape().isRequired,
  mowers: PropTypes.shape().isRequired,
  actions: PropTypes.shape().isRequired,
};

export default Select;

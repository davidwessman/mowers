import React from 'react';
import PropTypes from 'prop-types';
import Customer from 'components/customers/customer';
import SelectCustomer from 'components/customers/select';
import SelectMower from 'components/mowers/select';
import Mower from 'components/mowers/mower';
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
        <SelectCustomer
          all={customers.all}
          single={customers.customer}
          actions={actions.customers}
          state={customers.customer.state}
        />
        <SelectMower
          all={mowers.all}
          single={mowers.mower}
          actions={actions.mowers}
          state={mowers.mower.state}
          customerState={customers.customer.state}
          customer={customers.customer.data.id}
        />
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

import React from 'react';
import PropTypes from 'prop-types';
import MowerTable from 'components/mowers/table';
import Mower from 'components/mowers/mower';
import * as states from 'constants/states';

const SelectMower = ({ all, single, actions, state, customerState, customer }) => (
  <div className="tile">
    <div className="tile is-parent is-4">
      <Mower
        mower={single}
        actions={actions}
        customerState={customerState}
        customer={customer}
      />
    </div>
    <div className="tile is-parent">
      <MowerTable
        actions={actions}
        mowers={all}
        state={state}
        customerState={customerState}
      />
    </div>
  </div>
);

SelectMower.propTypes = {
  actions: PropTypes.shape().isRequired,
  all: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  single: PropTypes.shape().isRequired,
  state: PropTypes.string.isRequired,
  customerState: PropTypes.string,
};

SelectMower.defaultProps = {
  customerState: states.NEW,
};

export default SelectMower;

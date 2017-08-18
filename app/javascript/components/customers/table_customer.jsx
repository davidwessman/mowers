import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';

class TableCustomer extends React.Component {
  render() {
    return (
      <tr className={this.props.customer.selected ? 'is-selected' : 'nope'}>
        <td>
          <button
            onClick={() => this.props.onClick(this.props.customer)}
            className="button is-primary is-small"
            tabIndex={0}
          >
            Välj
          </button>
        </td>
        <td>{this.props.customer.name}</td>
        <td>{this.props.customer.phone}</td>
        <td>{this.props.customer.address}</td>
        <td>{this.props.customer.email}</td>
      </tr>
    );
  }
}

TableCustomer.propTypes = {
  customer: PropTypes.shape(PropHelper.customer()).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TableCustomer;

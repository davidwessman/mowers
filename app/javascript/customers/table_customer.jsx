import React from 'react';
import PropTypes from 'prop-types';

class TableCustomer extends React.Component {
  render() {
    return (
      <tr>
        <td><button onClick={() => this.props.onClick(this.props.customer)}>Välj</button></td>
        <td>{this.props.customer.name}</td>
        <td>{this.props.customer.phone}</td>
        <td>{this.props.customer.address}</td>
        <td>{this.props.customer.email}</td>
      </tr>
    );
  }
}

export default TableCustomer;

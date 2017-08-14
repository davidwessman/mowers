import React from 'react';
import PropTypes from 'prop-types';
import TableCustomer from 'customers/table_customer';

class CustomersTable extends React.Component {
  render() {
    const customers = [];
    this.props.customers.forEach((customer) => {
      customers.push(
        <TableCustomer
          key={customer.id}
          customer={customer}
          onClick={this.props.onClick}
        />,
      );
    });
    return (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th />
            <th>Namn</th>
            <th>Telefon</th>
            <th>Address</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers}
        </tbody>
      </table>
    );
  }
}

// CustomersTable.propTypes = {
//   customers: CustomerUtils.arrayOf().isRequired,
// };

export default CustomersTable;

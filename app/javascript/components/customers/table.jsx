import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';
import TableCustomer from 'components/customers/table_customer';
import * as states from 'constants/states';

class CustomerTable extends React.Component {
  render() {
    const { actions, customers, state } = this.props;

    if (state !== states.NEW) return null;

    return (
      <div className="tile is-8 is-parent">
        <div className="tile is-child">
          <div className="card mower">
            <header className="card-header">
              <p className="card-header-title">
                Kunder
              </p>
            </header>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
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
                      {customers.map(customer => (
                        <TableCustomer
                          key={customer.id}
                          customer={customer}
                          onClick={actions.selectCustomer}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CustomerTable.propTypes = {
  actions: PropTypes.shape().isRequired,
  customers: PropTypes.arrayOf(PropTypes.shape(PropHelper.customer())).isRequired,
  state: PropTypes.string,
};

CustomerTable.defaultProps = {
  state: states.NEW,
};

export default CustomerTable;

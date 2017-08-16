import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';
import NewCustomer from 'customers/new';
import CustomersTable from 'customers/table';

class PickCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: this.props.customers,
      customer: this.props.customer,
      errors: {},
    };
    const tokenElem = document.querySelector('meta[name="csrf-token"]');
    this.token = tokenElem && tokenElem.getAttribute('content');

    this.searchCustomers = this.searchCustomers.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
  }

  searchCustomers() {
    if (Object.keys(this.state.customer).length === 0) return;
    fetch('/search/customer', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': this.token,
      },
      body: JSON.stringify({
        search: this.state.customer,
      }),
      credentials: 'same-origin',
    })
    .then(response => response.json())
    .then((data) => {
      if ('customers' in data) {
        this.setState({
          customers: data.customers,
        });
      } else {
        this.setState({
          errors: data.errors,
        });
      }
    });
  }

  updateCustomer(customer) {
    this.setState({
      customer,
    });
    this.searchCustomers();
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div>
        <div className="columns">
          <h2 className="title">Välj kund</h2>
        </div>
        <div className="columns">
          <div className="column is-6">
            <NewCustomer
              customer={this.state.customer}
              onCreate={this.props.onSelect}
              onInput={this.updateCustomer}
            />
          </div>
          <div className="column">
            <CustomersTable
              customers={this.state.customers}
              onClick={this.props.onSelect}
            />
          </div>
        </div>
      </div>
    );
  }
}

PickCustomer.propTypes = {
  customer: PropTypes.shape(PropHelper.customer()),
  customers: PropTypes.arrayOf(PropTypes.shape(PropHelper.customer())),
  onSelect: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

PickCustomer.defaultProps = {
  customer: {},
  customers: [],
  show: true,
};

export default PickCustomer;

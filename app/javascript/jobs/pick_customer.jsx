import React from 'react';
import PropTypes from 'prop-types';
import CustomerForm from 'customers/form';
import CustomersTable from 'customers/table';

class PickCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      customer: {
        address: '',
        email: '',
        name: '',
        phone: '',
      },
      errors: {},
    };
    const tokenElem = document.querySelector('meta[name="csrf-token"]');
    this.token = tokenElem && tokenElem.getAttribute('content');

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    fetch('/customers', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': this.token,
      },
      body: JSON.stringify({
        customer: this.state.customer,
      }),
      credentials: 'same-origin',
    })
    .then(response => response.json())
    .then((data) => {
      if (data.errors !== undefined) {
        this.setState({
          errors: data.errors,
        });
      } else {
        this.props.onSelect(data);
        this.setState({
          customer: data,
          customers: [],
          errors: {},
        });
      }
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const newForm = Object.assign({}, this.state.customer);
    newForm[name] = value;

    this.setState({
      customer: newForm,
    });
  }

  handlePhoneChange(event) {
    this.handleInputChange(event);
    fetch('/search/customer', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': this.token,
      },
      body: JSON.stringify({
        search: { text: this.state.customer.phone },
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
            <CustomerForm
              errors={this.state.errors}
              fields={this.state.customer}
              onPhoneChange={this.handlePhoneChange}
              onInputChange={this.handleInputChange}
              onFormSubmit={this.handleFormSubmit}
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
  onSelect: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

PickCustomer.defaultProps = {
  show: true,
};

export default PickCustomer;

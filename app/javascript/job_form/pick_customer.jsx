import React from 'react';
import PropTypes from 'prop-types';
import CustomerForm from 'customers/form';
import CustomersTable from 'customers/table';

class PickCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      fields: {
        address: '',
        phone: '',
        email: '',
        name: '',
      },
      errors: {
        address: '',
        phone: '',
        email: '',
        name: '',
      },
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
        customer: this.state.fields,
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
          fields: {
            name: '', phone: '', address: '', email: '',
          },
          errors: {},
        });
      }
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const newForm = Object.assign({}, this.state.fields);
    newForm[name] = value;

    this.setState({
      fields: newForm,
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
        search: { text: this.state.fields.phone },
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
              fields={this.state.fields}
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

// JobForm.propTypes = {
//   fields: PropTypes.shape(
//   ).isRequired,
//   errors: PropTypes.shape({
//     address: PropTypes.string,
//     email: PropTypes.string,
//     name: PropTypes.string,
//     phone: PropTypes.string,
//   }),
//   onInputChange: PropTypes.func.isRequired,
//   onFormSubmit: PropTypes.func.isRequired,
// };
//
// JobForm.defaultProps = {
//   errors: {},
// };

export default PickCustomer;

import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';
import CustomerForm from 'customers/form';

class NewCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: props.customer,
      errors: props.errors,
    };

    const tokenElem = document.querySelector('meta[name="csrf-token"]');
    this.token = tokenElem && tokenElem.getAttribute('content');

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
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
        this.props.onCreate(data);
      }
    });
  }

  updateState(field, value) {
    const newCustomer = Object.assign({}, this.state.customer);
    newCustomer[field] = value;

    this.setState({
      customer: newCustomer,
    });
    this.props.onInput(newCustomer);
  }

  render() {
    return (
      <CustomerForm
        errors={this.state.errors}
        customer={this.props.customer}
        updateState={this.updateState}
        onFormSubmit={this.handleFormSubmit}
      />
    );
  }
}

NewCustomer.propTypes = {
  customer: PropTypes.shape(PropHelper.customer()).isRequired,
  errors: PropTypes.shape(PropHelper.mower()),
  onCreate: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
};

NewCustomer.defaultProps = {
  errors: {},
};

export default NewCustomer;

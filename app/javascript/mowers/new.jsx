import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';
import MowerForm from 'mowers/form';

class NewMower extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mower: props.mower,
      errors: props.errors,
    };

    const tokenElem = document.querySelector('meta[name="csrf-token"]');
    this.token = tokenElem && tokenElem.getAttribute('content');

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.setCustomer = this.setCustomer.bind(this);
  }

  setCustomer(customerId) {
    this.setState({
      mower: {
        customer_id: customerId,
      },
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    fetch('/mowers', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': this.token,
      },
      body: JSON.stringify({
        mower: this.state.mower,
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
    const newForm = Object.assign({}, this.state.mower);
    newForm[field] = value;

    this.setState({
      mower: newForm,
    });
  }

  render() {
    return (
      <MowerForm
        errors={this.state.errors}
        mower={this.state.mower}
        fields={this.state.mower}
        setState={this.updateState}
        onFormSubmit={this.handleFormSubmit}
        brands={this.props.brands}
      />
    );
  }
}

NewMower.propTypes = {
  mower: PropTypes.shape(PropHelper.mower()).isRequired,
  errors: PropTypes.shape(PropHelper.mower()),
  brands: PropTypes.shape(PropHelper.brands()).isRequired,
  onCreate: PropTypes.func.isRequired,
};

NewMower.defaultProps = {
  errors: {},
};

export default NewMower;

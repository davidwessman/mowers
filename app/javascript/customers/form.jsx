import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';
import InputField from 'components/input_field';

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.disabled = this.disabled.bind(this);
  }

  onInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.updateState(name, value);
  }
  disabled() {
    return (!(this.props.customer.address &&
              this.props.customer.email &&
              this.props.customer.phone &&
              this.props.customer.name));
  }

  render() {
    const errors = {};
    if (this.props.errors) {
      Object.keys(this.props.errors).forEach((key) => {
        errors[key] = this.props.errors[key][0];
      });
    }

    return (
      <form className="form" onSubmit={this.props.onFormSubmit}>
        <InputField
          error={errors.phone}
          id="phone"
          title="Telefon"
          onChange={this.onInputChange}
          value={this.props.customer.phone}
          type="tel"
        />
        <InputField
          error={errors.email}
          id="email"
          title="E-post"
          onChange={this.onInputChange}
          value={this.props.customer.email}
          type="email"
        />
        <InputField
          error={errors.name}
          id="name"
          title="Namn"
          onChange={this.onInputChange}
          value={this.props.customer.name}
          type="text"
        />
        <InputField
          error={errors.address}
          id="address"
          title="Adress"
          onChange={this.onInputChange}
          value={this.props.customer.address}
          type="text"
        />
        <div className="field">
          <p className="control">
            <button
              className="button is-primary"
              type="submit"
              disabled={this.disabled()}
            >
              Spara kund
            </button>
          </p>
        </div>
      </form>
    );
  }
}

CustomerForm.propTypes = {
  customer: PropTypes.shape(PropHelper.customer()).isRequired,
  errors: PropTypes.shape({
    address: PropTypes.arrayOf(PropTypes.string),
    email: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.arrayOf(PropTypes.string),
    phone: PropTypes.arrayOf(PropTypes.string),
  }),
  updateState: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

CustomerForm.defaultProps = {
  customer: {
    address: '',
    email: '',
    name: '',
    phone: '',
  },
  errors: {},
};

export default CustomerForm;

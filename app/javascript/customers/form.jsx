import React from 'react';
import PropTypes from 'prop-types';
import InputField from 'components/input_field';

class CustomerForm extends React.Component {
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
          onChange={this.props.onPhoneChange}
          value={this.props.fields.phone}
          type="tel"
        />
        <InputField
          error={errors.email}
          id="email"
          title="E-post"
          onChange={this.props.onInputChange}
          value={this.props.fields.email}
          type="email"
        />
        <InputField
          error={errors.name}
          id="name"
          title="Namn"
          onChange={this.props.onInputChange}
          value={this.props.fields.name}
          type="text"
        />
        <InputField
          error={errors.address}
          id="address"
          title="Adress"
          onChange={this.props.onInputChange}
          value={this.props.fields.address}
          type="text"
        />
        <div className="field">
          <p className="control">
            <button className="button is-primary" type="submit">
              Spara kund
            </button>
          </p>
        </div>
      </form>
    );
  }
}

CustomerForm.propTypes = {
  fields: PropTypes.shape(
    {
      address: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string,
    },
  ).isRequired,
  errors: PropTypes.shape({
    address: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
  }),
  onInputChange: PropTypes.func.isRequired,
  onPhoneChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

CustomerForm.defaultProps = {
  fields: {
    address: '',
    email: '',
    name: '',
    phone: '',
  },
  errors: {},
};

export default CustomerForm;

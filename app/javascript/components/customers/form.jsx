import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';
import InputField from 'components/input_field';

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.disabled = this.disabled.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur() {
    this.props.onBlur(this.props.customer);
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
      <div className="column is-6">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              {this.props.title}
            </p>
            {this.props.header}
          </header>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <form
                  className="form"
                  onSubmit={e => this.props.onFormSubmit(e, this.props.customer)}
                >
                  <InputField
                    status={this.props.status}
                    error={errors.phone}
                    id="phone"
                    title="Telefon"
                    onChange={this.props.onInputChange}
                    onBlur={this.onBlur}
                    value={this.props.customer.phone}
                    type="tel"
                  />
                  <InputField
                    status={this.props.status}
                    error={errors.email}
                    id="email"
                    title="E-post"
                    onChange={this.props.onInputChange}
                    onBlur={this.onBlur}
                    value={this.props.customer.email}
                    type="email"
                  />
                  <InputField
                    status={this.props.status}
                    error={errors.name}
                    id="name"
                    title="Namn"
                    onChange={this.props.onInputChange}
                    onBlur={this.onBlur}
                    value={this.props.customer.name}
                    type="text"
                  />
                  <InputField
                    status={this.props.status}
                    error={errors.address}
                    id="address"
                    title="Adress"
                    onChange={this.props.onInputChange}
                    onBlur={this.onBlur}
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
              </div>
            </div>
          </div>
        </div>
      </div>
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
  onInputChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFormSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  status: PropTypes.string,
  header: PropTypes.shape(),
};

CustomerForm.defaultProps = {
  header: null,
  status: 'NEW',
  title: 'Kund',
  customer: {
    address: '',
    email: '',
    name: '',
    phone: '',
  },
  errors: {},
  onBlur: () => {},
};

export default CustomerForm;

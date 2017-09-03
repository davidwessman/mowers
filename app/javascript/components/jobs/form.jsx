import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';
import InputField from 'components/input_field';

class JobForm extends React.Component {
  constructor(props) {
    super(props);
    this.disabled = this.disabled.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    this.props.onFormSubmit(event, this.props.job);
  }

  disabled() {
    return (!(this.props.job));
  }

  render() {
    const errors = {};
    // if (this.props.errors) {
    //   Object.keys(this.props.errors).forEach((key) => {
    //     errors[key] = this.props.errors[key][0];
    //   });
    // }

    return (
      <form
        className="form"
        onSubmit={this.onSubmit}
      >
        <InputField
          status={this.props.status}
          error={errors.address}
          id="address"
          title="Adress"
          onChange={this.props.onInputChange}
          value={this.props.customer.address}
          type="text"
        />
        <div className="field">
          <div className="control">
            <button
              className={this.disabled() ? 'button is-warning' : 'button is-primary'}
              type="submit"
            >
              {this.disabled() ? 'Sök' : 'Spara'}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

JobForm.propTypes = {
  customer: PropTypes.shape(PropHelper.customer()).isRequired,
  errors: PropTypes.shape({
    address: PropTypes.arrayOf(PropTypes.string),
    email: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.arrayOf(PropTypes.string),
    phone: PropTypes.arrayOf(PropTypes.string),
  }),
  onInputChange: PropTypes.func.isRequired,
  search: PropTypes.func,
  onFormSubmit: PropTypes.func.isRequired,
  status: PropTypes.string,
};

JobForm.defaultProps = {
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
  search: () => {},
};

export default JobForm;

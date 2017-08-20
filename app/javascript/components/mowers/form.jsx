import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';
import InputField from 'components/input_field';
import SelectField from 'components/select_field';

class MowerForm extends React.Component {
  constructor(props) {
    super(props);

    this.onBrandChange = this.onBrandChange.bind(this);
    this.disabled = this.disabled.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onBrandChange(selected) {
    const value = (selected !== null) ? selected.value : '';
    const event = {
      target: {
        type: 'select',
        name: 'brand',
        value,
      },
    };
    this.props.onInputChange(event);
  }

  onSubmit(event) {
    this.props.onFormSubmit(event, this.props.mower, this.props.customer);
  }

  disabled() {
    return (!(this.props.mower.brand &&
              this.props.mower.model &&
              this.props.mower.year));
  }

  render() {
    const brands = {
      other: 'Annat',
      husqvarna: 'Husqvarna',
      stiga: 'Stiga',
      klippo: 'Klippo',
    };
    const errors = {};
    if (this.props.errors) {
      Object.keys(this.props.errors).forEach((key) => {
        errors[key] = this.props.errors[key][0];
      });
    }

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <SelectField
          id="brand-select"
          title="Märke"
          value={this.props.mower.brand}
          options={brands}
          onChange={this.onBrandChange}
        />
        <InputField
          error={errors.model}
          id="model"
          title="Modell"
          onChange={this.props.onInputChange}
          value={this.props.mower.model}
          type="text"
        />
        <InputField
          error={errors.year}
          id="year"
          title="Tillverkningsår"
          onChange={this.props.onInputChange}
          value={this.props.mower.year}
          type="text"
        />
        <div className="field">
          <p className="control">
            <button
              className="button is-primary"
              type="submit"
              disabled={this.disabled()}
            >
              Spara
            </button>
          </p>
        </div>
      </form>
    );
  }
}

MowerForm.propTypes = {
  errors: PropTypes.shape({
    brand: PropTypes.arrayOf(PropTypes.string),
    model: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.arrayOf(PropTypes.string),
  }),
  mower: PropTypes.shape(PropHelper.mower()).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  customer: PropTypes.number.isRequired,
};

MowerForm.defaultProps = {
  errors: {},
};

export default MowerForm;

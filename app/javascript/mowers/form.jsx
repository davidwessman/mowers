import React from 'react';
import PropTypes from 'prop-types';
import InputField from 'components/input_field';
import SelectField from 'components/select_field';

class MowerForm extends React.Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onBrandChange = this.onBrandChange.bind(this);
  }

  onInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.setState(name, value);
  }

  onBrandChange(selected) {
    this.props.setState('brand', selected.value);
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
        <SelectField
          id="brand-select"
          title="Märke"
          value={this.props.mower.brand}
          options={this.props.brands}
          onChange={this.onBrandChange}
        />
        <InputField
          error={errors.model}
          id="model"
          title="Modell"
          onChange={this.onInputChange}
          value={this.props.mower.model}
          type="text"
        />
        <InputField
          error={errors.year}
          id="year"
          title="Tillverkningsår"
          onChange={this.onInputChange}
          value={this.props.mower.year}
          type="text"
        />
        <div className="field">
          <p className="control">
            <button className="button is-primary" type="submit">
              Spara
            </button>
          </p>
        </div>
      </form>
    );
  }
}

// MowerForm.propTypes = {
//   mower: PropTypes.shape(
//     {
//       brand: PropTypes.string,
//       model: PropTypes.string,
//       year: PropTypes.integer,
//     },
//   ).isRequired,
//   errors: PropTypes.shape({
//     brand: PropTypes.string,
//     model: PropTypes.string,
//     year: PropTypes.string,
//   }),
//   onInputChange: PropTypes.func.isRequired,
//   onFormSubmit: PropTypes.func.isRequired,
// };
//
// MowerForm.defaultProps = {
//   errors: {},
// };

export default MowerForm;

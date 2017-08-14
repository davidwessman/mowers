import React from 'react';
import PropTypes from 'prop-types';
import InputField from 'components/form_utils';

class MowerForm extends React.Component {
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
          id="brand"
          title="Märke"
          onChange={this.props.onInputChange}
          value={this.props.fields.brand}
          type="text"
        />
        <InputField
          error={errors.email}
          id="model"
          title="Modell"
          onChange={this.props.onInputChange}
          value={this.props.fields.model}
          type="text"
        />
        <InputField
          error={errors.year}
          id="year"
          title="Tillverkningsår"
          onChange={this.props.onInputChange}
          value={this.props.fields.year}
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

MowerForm.propTypes = {
  fields: PropTypes.shape(
    {
      brand: PropTypes.string,
      model: PropTypes.string,
      year: PropTypes.integer,
    },
  ).isRequired,
  errors: PropTypes.shape({
    brand: PropTypes.string,
    model: PropTypes.string,
    year: PropTypes.string,
  }),
  onInputChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

MowerForm.defaultProps = {
  errors: {},
};

export default MowerForm;

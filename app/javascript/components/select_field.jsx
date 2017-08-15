import React from 'react';
import PropTypes from 'prop-types';
import ErrorField from 'components/error_field';
import Select from 'react-select';

class SelectField extends React.Component {
  render() {
    let error = null;
    if (this.props.error) {
      error = <ErrorField message={this.props.error} />;
    }

    const options = [];
    if (this.props.options) {
      Object.keys(this.props.options).forEach((key) => {
        options.push({ value: key, label: this.props.options[key] });
      });
    }

    return (
      <div className="field">
        <label className="label" htmlFor={this.props.id}>{this.props.title}</label>
        <div className="control">
          <Select
            name={this.props.id}
            value={this.props.value}
            options={options}
            onChange={this.props.onChange}
            type="text"
          />
        </div>
        {error}
      </div>
    );
  }
}

SelectField.propTypes = {
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
};

SelectField.defaultProps = {
  error: null,
  value: '',
};


export default SelectField;

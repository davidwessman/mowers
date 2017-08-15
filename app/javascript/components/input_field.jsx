import React from 'react';
import PropTypes from 'prop-types';
import ErrorField from 'components/error_field';

class InputField extends React.Component {
  render() {
    let error = null;
    if (this.props.error) {
      error = <ErrorField message={this.props.error} />;
    }

    return (
      <div className="field">
        <label className="label" htmlFor={this.props.id}>{this.props.title}</label>
        <p className="control">
          <input
            className="input"
            type={this.props.type}
            placeholder={this.props.title}
            name={this.props.id}
            defaultValue={this.props.value}
            onChange={this.props.onChange}
          />
        </p>
        {error}
      </div>
    );
  }
}

InputField.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

InputField.defaultProps = {
  error: null,
  value: '',
};


export default InputField;

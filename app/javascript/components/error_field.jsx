import React from 'react';
import PropTypes from 'prop-types';

class ErrorField extends React.Component {
  render() {
    return (
      <p className="help is-danger">
        {this.props.message}
      </p>
    );
  }
}

ErrorField.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorField;

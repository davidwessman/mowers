import React from 'react';
import PropTypes from 'prop-types';

const ErrorField = () => {
  return (
    <p className="help is-danger">
      {this.props.message}
    </p>
  );
};

ErrorField.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorField;

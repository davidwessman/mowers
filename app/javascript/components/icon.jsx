import React from 'react';
import PropTypes from 'prop-types';

class Icon extends React.Component {
  render() {
    let className = `fa fa-${this.props.icon}`;
    if (this.props.spin) className += ' fa-spin';
    return (
      <i className={className} />
    );
  }
}

Icon.propTypes = {
  icon: PropTypes.string,
  spin: PropTypes.bool,
};

Icon.defaultProps = {
  icon: 'heart',
  spin: false,
};

export default Icon;

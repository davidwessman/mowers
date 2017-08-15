import React from 'react';
import PropTypes from 'prop-types';

class Icon extends React.Component {
  render() {
    return (
      <i className={`fa fa-${this.props.icon}`} />
    );
  }
}

Icon.propTypes = {
  icon: PropTypes.string,
};

Icon.defaultProps = {
  icon: 'heart',
};

export default Icon;

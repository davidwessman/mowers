import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';

class IconButton extends React.Component {
  render() {
    return (
      <a
        role="button"
        className={this.props.class}
        onClick={this.props.onClick}
        tabIndex={0}
      >
        {this.props.text} &nbsp;
        <Icon icon={this.props.icon} />
      </a>
    );
  }
}

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  class: PropTypes.string,
};

IconButton.defaultProps = {
  icon: 'times',
  class: 'button is-primary',
};

export default IconButton;

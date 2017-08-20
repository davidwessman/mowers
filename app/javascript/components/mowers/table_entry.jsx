import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';

class TableEntry extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <button
            onClick={() => this.props.onClick(this.props.mower)}
            className="button is-primary is-small"
          >
            Välj
          </button>
        </td>
        <td>{this.props.brand}</td>
        <td>{this.props.mower.model}</td>
        <td>{this.props.mower.year}</td>
      </tr>
    );
  }
}

TableEntry.propTypes = {
  mower: PropTypes.shape(PropHelper.mower()).isRequired,
  brand: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TableEntry;

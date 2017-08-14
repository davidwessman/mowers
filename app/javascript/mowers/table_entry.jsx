import React from 'react';
import PropTypes from 'prop-types';

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

export default TableEntry;

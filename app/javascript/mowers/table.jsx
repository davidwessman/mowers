import React from 'react';
import PropTypes from 'prop-types';
import TableEntry from 'mowers/table_entry';

class MowersTable extends React.Component {
  render() {
    if (this.props.mowers === undefined) return null;

    const mowers = [];
    Array.from(this.props.mowers).forEach((mower) => {
      mowers.push(
        <TableEntry
          key={mower.id}
          mower={mower}
          onClick={this.props.onClick}
          brand={this.props.brands[mower.brand]}
        />,
      );
    });
    return (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th />
            <th>Märke</th>
            <th>Modell</th>
            <th>Tillverkningsår</th>
          </tr>
        </thead>
        <tbody>
          {mowers}
        </tbody>
      </table>
    );
  }
}

// MowersTable.propTypes = {
//   mowers: CustomerUtils.arrayOf().isRequired,
// };

export default MowersTable;

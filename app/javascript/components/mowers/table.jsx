import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';
import TableEntry from 'components/mowers/table_entry';
import * as states from 'constants/states';

class MowerTable extends React.Component {
  render() {
    if (this.props.customerState === states.NEW ||
        this.props.mowerState !== states.NEW) return null;

    const mowers = [];
    Array.from(this.props.mowers).forEach((mower) => {
      mowers.push(
        <TableEntry
          key={mower.id}
          mower={mower}
          onClick={this.props.actions.selectMower}
          brand={mower.brand}
        />,
      );
    });
    return (
      <div className="tile is-child">
        <div className="card mower">
          <header className="card-header">
            <p className="card-header-title">
              Gräsklippare
            </p>
          </header>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MowerTable.propTypes = {
  actions: PropTypes.shape().isRequired,
  mowers: PropTypes.arrayOf(PropTypes.shape(PropHelper.mower())),
  customerState: PropTypes.string,
  mowerState: PropTypes.string,
};

MowerTable.defaultProps = {
  customerState: states.NEW,
  errors: {},
  mowers: [],
  mowerState: states.NEW,
};

export default MowerTable;

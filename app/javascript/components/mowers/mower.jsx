import React from 'react';
import PropTypes from 'prop-types';
import MowerData from 'components/mowers/data';
import MowerForm from 'components/mowers/form';
import * as states from 'constants/states';

class Mower extends React.Component {
  constructor() {
    super();

    this.content = this.content.bind(this);
    this.header = this.header.bind(this);
  }

  header() {
    switch (this.props.mower.state) {
      case states.SELECTED:
        return <p className="card-header-title">Gräsklippare</p>;
      case states.NEW:
        return <p className="card-header-title">Ny gräsklippare</p>;
      case states.EDIT:
        return <p className="card-header-title">Redigera gräsklippare</p>;

      default:
        return null;
    }
  }

  content() {
    switch (this.props.mower.state) {
      case states.SELECTED:
        return <MowerData mower={this.props.mower.data} />;
      case states.NEW:
        return (
          <MowerForm
            customer={this.props.customer}
            errors={this.props.mower.errors}
            mower={this.props.mower.data}
            onFormSubmit={this.props.actions.newMowerSubmit}
            onInputChange={this.props.actions.newMowerInputChange}
          />
        );
      case states.EDIT:
        return (
          <MowerForm
            customer={this.props.customer}
            errors={this.props.mower.errors}
            mower={this.props.mower.data}
            onFormSubmit={this.props.actions.editMowerSubmit}
            onInputChange={this.props.actions.editMowerInputChange}
          />
        );

      default:
        return null;
    }
  }

  render() {
    if (this.props.customerState === states.NEW) return null;
    return (
      <div className="column is-6">
        <div className="card">
          <header className="card-header">
            {this.header()}
          </header>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                {this.content()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Mower.propTypes = {
  mower: PropTypes.shape().isRequired,
  actions: PropTypes.shape().isRequired,
  customerState: PropTypes.string,
  customer: PropTypes.number,
};

Mower.defaultProps = {
  customerState: states.NEW,
  customer: -1,
}

export default Mower;

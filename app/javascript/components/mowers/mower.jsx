import React from 'react';
import PropTypes from 'prop-types';
import MowerData from 'components/mowers/data';
import MowerForm from 'components/mowers/form';
import IconButton from 'components/icon_button';
import * as states from 'constants/states';

class Mower extends React.Component {
  constructor() {
    super();

    this.content = this.content.bind(this);
    this.header = this.header.bind(this);
  }

  header() {
    switch (this.props.mower.state) {
      case states.NEW:
        return (
          <header className="card-header">
            <p className="card-header-title">Ny gräsklippare</p>
          </header>
        );
      case states.SELECTED:
        return (
          <header className="card-header">
            <p className="card-header-title">Gräsklippare</p>
            <IconButton
              onClick={this.props.actions.onMowerDeselect}
              icon={'times'}
              text={'Avmarkera'}
              class={'card-header-icon'}
            />
          </header>
        );
      case states.EDIT:
        return (
          <header className="card-header">
            <p className="card-header-title">Redigera gräsklippare</p>
            <IconButton
              onClick={this.props.actions.onMowerDeselect}
              icon={'times'}
              text={'Avmarkera'}
              class={'card-header-icon'}
            />
          </header>
        );

      default:
        return null;
    }
  }

  content() {
    switch (this.props.mower.state) {
      case states.SELECTED:
        return (
          <div>
            <MowerData mower={this.props.mower.data} />
            <br />
            <IconButton
              onClick={this.props.actions.editMower}
              icon={'wrench'}
              text={'Redigera'}
            />
          </div>
        );
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
            mower={this.props.mower.edit_data}
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
      <div className="tile is-child">
        <div className="card">
          {this.header()}
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
};

export default Mower;

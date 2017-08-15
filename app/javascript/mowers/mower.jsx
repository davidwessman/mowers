import React from 'react';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';
import EditMower from 'mowers/edit';

class Mower extends React.Component {
  render() {
    if (this.props.mower.id === undefined) return null;

    if (this.props.edit) {
      return (
        <div className="column is-6">
          <EditMower
            mower={this.props.mower}
            onUpdate={this.props.onSelect}
            brands={this.props.brands}
          />
        </div>
      );
    }

    return (
      <div className="column is-6">
        <div className="card mower">
          <header className="card-header">
            <p className="card-header-title">
              Gräsklippare
            </p>
            <a
              role="button"
              className="card-header-icon"
              onClick={this.props.onDeselect}
              tabIndex={-1}
            >
              Avmarkera &nbsp;
              <Icon icon="times" />
            </a>
          </header>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <ul>
                  <li><Icon icon="hashtag" />{`Id: ${this.props.mower.id}`}</li>
                  <li><Icon icon="tasks" />{this.props.brands[this.props.mower.brand]}</li>
                  <li><Icon icon="tag" />{this.props.mower.model}</li>
                  <li><Icon icon="calendar" /> {this.props.mower.year}</li>
                </ul>
              </div>
            </div>
            <a
              role="button"
              className="button is-primary"
              onClick={this.props.onEditClick}
              tabIndex={0}
            >
              Redigera &nbsp;
              <Icon icon="wrench" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

EditMower.propTypes = {
  mower: PropTypes.shape(PropHelper.mower()).isRequired,
  errors: PropTypes.shape(PropHelper.mower()),
  brands: PropTypes.shape(PropHelper.brands()).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

Mower.propTypes = {
  brands: PropTypes.shape(PropHelper.brands()).isRequired,
  edit: PropTypes.bool,
  mower: PropTypes.shape(PropHelper.mower()).isRequired,
  onDeselect: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

Mower.defaultProps = {
  edit: false,
};

export default Mower;

import React from 'react';
import Icon from 'components/icon';

class Mower extends React.Component {
  render() {
    if (this.props.mower === undefined) return null;

    return (
      <div className="column is-6">
        <div className="card mower">
          <header className="card-header">
            <p className="card-header-title">
              Gräsklippare
            </p>
            <a className="card-header-icon" onClick={this.props.onClick}>
              Avmarkera &nbsp;
              <Icon icon="times"/>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Mower;

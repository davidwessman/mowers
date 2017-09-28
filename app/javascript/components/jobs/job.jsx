import React from 'react';
import PropTypes from 'prop-types';
import JobForm from 'components/jobs/form';
import * as states from 'constants/states';

class Job extends React.Component {
  constructor() {
    super();

    this.header = this.header.bind(this);
    this.content = this.content.bind(this);
  }

  header() {
    switch (this.props.job.state) {
      case states.NEW:
        return (
          <header className="card-header">
            <p className="card-header-title">Nytt jobb</p>
          </header>
        );
      case states.SELECTED:
        return (
          <header className="card-header">
            <p className="card-header-title">Jobb</p>
          </header>
        );
      case states.EDIT:
        return (
          <header className="card-header">
            <p className="card-header-title">Redigera jobb</p>;
          </header>
        );
      default:
        return null;
    }
  }

  content() {
    const job = this.props.job.data;
    const actions = this.props.actions;
    switch (this.props.job.state) {
      case states.SELECTED:
        return (
          <div className="media-content">
            <a className="button is-primary" href={`/jobs/${job.id}`}>Jobb</a>
          </div>
        );
      case states.NEW:
        return (
          <div className="media-content">
            <JobForm
              status={states.NEW}
              job={job}
              mower={this.props.mower.data.id}
              onFormSubmit={actions.newJobSubmit}
            />
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    if (this.props.mower.state === states.NEW) return null;
    return (
      <div className="tile is-parent">
        <div className="tile is-child">
          <div className="card">
            {this.header()}
            <div className="card-content">
              <div className="media">
                {this.content()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Job.propTypes = {
  job: PropTypes.shape().isRequired,
  mower: PropTypes.shape().isRequired,
  actions: PropTypes.shape().isRequired,
};

Job.defaultProps = {
  job: null,
};

export default Job;

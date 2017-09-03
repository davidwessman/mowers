import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import IconButton from 'components/icon_button';
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
            <p className="title is-4">{job.name}</p>
            <ul>
              <li><Icon icon="hashtag" />{`Id: ${job.id}`}</li>
              <li><Icon icon="phone" />{job.phone}</li>
              <li><Icon icon="envelope" />{job.email}</li>
              <li><Icon icon="home" /> {job.address}</li>
            </ul>
            <br />
            <IconButton
              onClick={this.props.actions.editJob}
              icon={'wrench'}
              text={'Redigera'}
            />
          </div>
        );
      case states.NEW:
        return (
          <div className="media-content">
            <JobForm
              status={states.NEW}
              job={job}
              errors={this.props.job.errors}
              onFormSubmit={actions.newJobSubmit}
              onInputChange={actions.newJobInputChange}
              search={actions.newJobSearch}
            />
          </div>
        );
      case states.EDIT:
        return (
          <div className="media-content">
            <JobForm
              status={states.EDIT}
              job={job}
              errors={this.props.job.errors}
              onFormSubmit={actions.editJobSubmit}
              onInputChange={actions.editJobInputChange}
            />
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    if (this.props.customer.state === states.NEW || this.props.mower.state === states.NEW) return null;
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
  job: PropTypes.shape(

  ).isRequired,
  actions: PropTypes.shape().isRequired,
};

Job.defaultProps = {
  job: null,
};

export default Job;

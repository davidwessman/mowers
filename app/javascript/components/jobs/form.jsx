import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';

class JobForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    this.props.onFormSubmit(event, this.props.mower);
  }

  render() {
    return (
      <form
        className="form"
        onSubmit={this.onSubmit}
      >
        <div className="field">
          <div className="control">
            <button
              className="button is-primary"
              type="submit"
            >
              Spara
            </button>
          </div>
        </div>
      </form>
    );
  }
}

JobForm.propTypes = {
  mower: PropTypes.number.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default JobForm;

import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';
import MowerForm from 'mowers/form';

class EditMower extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mower: props.mower,
      errors: props.errors,
    };

    const tokenElem = document.querySelector('meta[name="csrf-token"]');
    this.token = tokenElem && tokenElem.getAttribute('content');

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    fetch(`/mowers/${this.props.mower.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': this.token,
      },
      body: JSON.stringify({
        mower: this.state.mower,
      }),
      credentials: 'same-origin',
    })
    .then(response => response.json())
    .then((data) => {
      if (data.errors !== undefined) {
        this.setState({
          errors: data.errors,
        });
      } else {
        this.props.onUpdate(data);
      }
    });
  }

  updateState(field, value) {
    const newForm = Object.assign({}, this.state.mower);
    newForm[field] = value;

    this.setState({
      mower: newForm,
    });
  }


  render() {
    return (
      <MowerForm
        errors={this.state.errors}
        mower={this.state.mower}
        updateState={this.updateState}
        setState={this.updateState}
        onFormSubmit={this.handleFormSubmit}
        brands={this.props.brands}
      />
    );
  }
}

EditMower.propTypes = {
  mower: PropTypes.shape(PropHelper.mower()).isRequired,
  errors: PropTypes.shape(PropHelper.mower()),
  brands: PropTypes.shape(PropHelper.brands()).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

EditMower.defaultProps = {
  errors: {},
};

export default EditMower;

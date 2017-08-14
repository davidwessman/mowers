import React from 'react';
import PropTypes from 'prop-types';
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
    fetch('/mowers/' + this.props.mower.id, {
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
        this.setState({
          mower: data,
          errors: {},
        });
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

// JobForm.propTypes = {
//   mower: PropTypes.shape(
//   ).isRequired,
//   errors: PropTypes.shape({
//     address: PropTypes.string,
//     email: PropTypes.string,
//     name: PropTypes.string,
//     phone: PropTypes.string,
//   }),
//   onInputChange: PropTypes.func.isRequired,
//   onFormSubmit: PropTypes.func.isRequired,
// };
//
// JobForm.defaultProps = {
//   errors: {},
// };

export default EditMower;

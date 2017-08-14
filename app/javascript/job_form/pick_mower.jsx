import React from 'react';
import PropTypes from 'prop-types';
import MowerForm from 'mowers/form';
import MowersTable from 'mowers/table';

class PickMower extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mowers: [],
      fields: {
        brand: '',
        model: '',
        year: '',
      },
      errors: {
        address: '',
        phone: '',
        email: '',
      },
    };
    const tokenElem = document.querySelector('meta[name="csrf-token"]');
    this.token = tokenElem && tokenElem.getAttribute('content');

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.formParams = this.formParams.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    fetch('/mowers', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': this.token,
      },
      body: JSON.stringify(this.formParams()),
      credentials: 'same-origin',
    })
    .then(response => response.json())
    .then((data) => {
      if (data.errors !== undefined) {
        this.setState({
          errors: data.errors,
        });
      } else {
        this.props.onSelect(data);
        this.setState({
          mower: data,
          mowers: [data],
          fields: {
            brand: '', model: '', year: '',
          },
          errors: {},
        });
      }
    });
  }

  formParams() {
    const fields = Object.assign({}, this.state.fields);
    fields.customer_id = this.props.customer.id;

    return { mower: fields };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const newForm = Object.assign({}, this.state.fields);
    newForm[name] = value;

    this.setState({
      fields: newForm,
    });
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div>
        <div className="columns">
          <h2 className="title">Välj gräsklippare</h2>
        </div>
        <div className="columns">
          <div className="column is-6">
            <MowerForm
              errors={this.state.errors}
              fields={this.state.fields}
              onInputChange={this.handleInputChange}
              onFormSubmit={this.handleFormSubmit}
              brands={this.props.brands}
            />
          </div>
          <div className="column">
            <MowersTable
              mowers={this.props.mowers}
              onClick={this.props.onSelect}
              brands={this.props.brands}
            />
          </div>
        </div>
      </div>
    );
  }
}

// JobForm.propTypes = {
//   fields: PropTypes.shape(
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

export default PickMower;

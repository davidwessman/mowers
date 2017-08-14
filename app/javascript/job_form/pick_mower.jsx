import React from 'react';
import PropTypes from 'prop-types';
import MowerForm from 'mowers/form';
import NewMower from 'mowers/new';
import MowersTable from 'mowers/table';

class PickMower extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mowers: [],
      mower: {
        customer_id: this.props.customer.id,
      },
    };

    const tokenElem = document.querySelector('meta[name="csrf-token"]');
    this.token = tokenElem && tokenElem.getAttribute('content');

    this.getMowers = this.getMowers.bind(this);
  }

  getMowers(customer_id) {
    fetch('/search/mower', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': this.token,
      },
      body: JSON.stringify({
        customer_id,
      }),
      credentials: 'same-origin',
    })
    .then(response => response.json())
    .then((data) => {
      if ('mowers' in data) {
        this.setState({
          mowers: data.mowers,
        });
      } else {
        this.setState({
          errors: data.errors,
        });
      }
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
            <NewMower
              mower={this.state.mower}
              onCreate={this.props.onSelect}
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

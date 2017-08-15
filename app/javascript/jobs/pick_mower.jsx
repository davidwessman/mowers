import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';
import NewMower from 'mowers/new';
import MowersTable from 'mowers/table';

class PickMower extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mowers: this.props.mowers,
      mower: {
        customer_id: this.props.customer.id,
      },
    };

    const tokenElem = document.querySelector('meta[name="csrf-token"]');
    this.token = tokenElem && tokenElem.getAttribute('content');

    this.getMowers = this.getMowers.bind(this);
    this.setCustomer = this.setCustomer.bind(this);
  }

  setCustomer(customerId) {
    this.setState({
      mower: {
        customer_id: customerId,
      },
    });
    this.getMowers(customerId);
  }

  getMowers(customerId) {
    fetch('/search/mower', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': this.token,
      },
      body: JSON.stringify({
        customer_id: customerId,
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
              mowers={this.state.mowers}
              onClick={this.props.onSelect}
              brands={this.props.brands}
            />
          </div>
        </div>
      </div>
    );
  }
}

PickMower.propTypes = {
  brands: PropTypes.shape(PropHelper.brands()).isRequired,
  customer: PropTypes.shape(),
  mowers: PropTypes.arrayOf(PropTypes.shape()),
  onSelect: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

PickMower.defaultProps = {
  customer: {},
  errors: {},
  mowers: [],
  show: true,
};

export default PickMower;

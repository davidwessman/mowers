import React from 'react';
import PropTypes from 'prop-types';
import PickCustomer from 'job_form/pick_customer';
import Customer from 'customers/customer';
import PickMower from 'job_form/pick_mower';
import Mower from 'mowers/mower';
import InputField from 'components/form_utils';

class JobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: props.customer,
      mower: props.mower,
      mower_id: (props.mower !== undefined) ? props.mower.id : undefined,
      mowers: props.mowers,
    };
    const tokenElem = document.querySelector('meta[name="csrf-token"]');
    this.token = tokenElem && tokenElem.getAttribute('content');

    this.selectCustomer = this.selectCustomer.bind(this);
    this.selectMower = this.selectMower.bind(this);
    this.deselectMower = this.deselectMower.bind(this);
    this.getMowers = this.getMowers.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  getMowers(id) {
    fetch('/search/mower', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': this.token,
      },
      body: JSON.stringify({
        customer_id: id,
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

  handleFormSubmit(e) {
    e.preventDefault();
    fetch('/jobs', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': this.token,
      },
      body: JSON.stringify({
        job: { mower_id: this.state.mower_id },
      }),
      credentials: 'same-origin',
    })
    .then(response => response.json())
    .then((data) => {
      if ('jobs' in data) {
        this.setState({
          jobs: data.jobs,
          errors: {},
        });
      } else {
        this.setState({
          errors: data.errors,
        });
      }
    });
  }

  selectCustomer(customer) {
    this.setState({
      customer,
    });
    this.getMowers(customer.id);
  }

  selectMower(mower) {
    this.setState({
      mower,
      mower_id: mower.id,
    });
  }

  deselectMower() {
    this.setState({
      mower: undefined,
      mower_id: undefined,
    });
    this.getMowers(this.state.customer.id);
  }


  render() {
    return (
      <div>
        <div className="columns">
          <Customer customer={this.state.customer} />
          <Mower
            mower={this.state.mower}
            brands={this.props.brands}
            onClick={this.deselectMower}
          />
        </div>
        <PickCustomer onSelect={this.selectCustomer} show={this.state.customer === undefined} />
        <PickMower
          onSelect={this.selectMower}
          customer={this.state.customer}
          show={this.state.mower === undefined && this.state.customer !== undefined}
          mowers={this.state.mowers}
          brands={this.props.brands}
        />
        <hr/>
        <form className="form" onSubmit={this.handleFormSubmit}>
          <input
            className="hidden"
            type="hidden"
            name="mower_id"
            defaultValue={this.state.mower_id}
          />
          <button
            className="button is-primary"
            type="submit"
            disabled={this.state.mower === undefined}
          >
            Spara jobb
          </button>
        </form>
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

export default JobForm;

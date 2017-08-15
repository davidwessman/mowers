import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';
import PickCustomer from 'jobs/pick_customer';
import Customer from 'customers/customer';
import PickMower from 'jobs/pick_mower';
import Mower from 'mowers/mower';

class JobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: props.customer,
      edit_mower: false,
      mower: props.mower,
      mower_id: props.mower.id,
      mowers: props.mowers,
    };
    const tokenElem = document.querySelector('meta[name="csrf-token"]');
    this.token = tokenElem && tokenElem.getAttribute('content');

    this.allowMowerEdit = this.allowMowerEdit.bind(this);
    this.deselectMower = this.deselectMower.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.selectMower = this.selectMower.bind(this);
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
    this.pick_mower.setCustomer(customer.id);
  }

  selectMower(mower) {
    this.setState({
      mower,
      mower_id: mower.id,
      edit_mower: false,
    });
  }

  deselectMower() {
    this.setState({
      mower: {},
      mower_id: undefined,
    });
    this.pick_mower.getMowers(this.state.customer.id);
  }

  allowMowerEdit() {
    this.setState({
      edit_mower: true,
    });
  }

  render() {
    return (
      <div>
        <div className="columns">
          <Customer customer={this.state.customer} />
          <Mower
            mower={this.state.mower}
            brands={this.props.brands}
            edit={this.state.edit_mower}
            onDeselect={this.deselectMower}
            onEditClick={this.allowMowerEdit}
            onSelect={this.selectMower}
          />
        </div>
        <PickCustomer
          onSelect={this.selectCustomer}
          show={this.state.customer.id === undefined}
        />
        <PickMower
          ref={(p) => { this.pick_mower = p; }}
          onSelect={this.selectMower}
          customer={this.state.customer}
          show={this.state.mower.id === undefined && this.state.customer.id !== undefined}
          mowers={this.state.mowers}
          brands={this.props.brands}
        />
        <hr />
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

JobForm.propTypes = {
  brands: PropTypes.shape(PropHelper.brands()).isRequired,
  customer: PropTypes.shape(PropHelper.customer()),
  mower: PropTypes.shape(PropHelper.mower()),
  mowers: PropTypes.arrayOf(PropTypes.shape(PropHelper.mower())),
};

JobForm.defaultProps = {
  customer: {},
  errors: {},
  mower: {},
  mowers: [],
};

export default JobForm;

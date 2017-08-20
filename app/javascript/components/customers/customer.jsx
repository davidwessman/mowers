import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import IconButton from 'components/icon_button';
import CustomerForm from 'components/customers/form';
import * as states from 'constants/states';

class Customer extends React.Component {
  constructor() {
    super();

    this.header = this.header.bind(this);
    this.content = this.content.bind(this);
  }

  header() {
    switch (this.props.customer.state) {
      case states.NEW:
        return (
          <header className="card-header">
            <p className="card-header-title">Ny kund</p>
          </header>
        );
      case states.SELECTED:
        return (
          <header className="card-header">
            <p className="card-header-title">Kund</p>
            <IconButton
              onClick={this.props.actions.onCustomerDeselect}
              icon={'times'}
              text={'Avmarkera'}
              class={'card-header-icon'}
            />
          </header>
        );
      case states.EDIT:
        return (
          <header className="card-header">
            <p className="card-header-title">Redigera kund</p>;
            <IconButton
              onClick={this.props.actions.onCustomerDeselect}
              icon={'times'}
              text={'Avmarkera'}
              class={'card-header-icon'}
            />
          </header>
        );
      default:
        return null;
    }
  }

  content() {
    const customer = this.props.customer.data;
    const actions = this.props.actions;
    switch (this.props.customer.state) {
      case states.SELECTED:
        return (
          <div className="media-content">
            <p className="title is-4">{customer.name}</p>
            <ul>
              <li><Icon icon="hashtag" />{`Id: ${customer.id}`}</li>
              <li><Icon icon="phone" />{customer.phone}</li>
              <li><Icon icon="envelope" />{customer.email}</li>
              <li><Icon icon="home" /> {customer.address}</li>
            </ul>
            <br />
            <IconButton
              onClick={this.props.actions.editCustomer}
              icon={'wrench'}
              text={'Redigera'}
            />
          </div>
        );
      case states.NEW:
        return (
          <div className="media-content">
            <CustomerForm
              status={states.NEW}
              customer={customer}
              errors={this.props.customer.errors}
              onFormSubmit={actions.newCustomerSubmit}
              onInputChange={actions.newCustomerInputChange}
              search={actions.newCustomerSearch}
            />
          </div>
        );
      case states.EDIT:
        return (
          <div className="media-content">
            <CustomerForm
              status={states.EDIT}
              customer={customer}
              errors={this.props.customer.errors}
              onFormSubmit={actions.editCustomerSubmit}
              onInputChange={actions.editCustomerInputChange}
            />
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="tile is-4 is-parent">
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

Customer.propTypes = {
  customer: PropTypes.shape(

  ).isRequired,
  actions: PropTypes.shape().isRequired,
};

Customer.defaultProps = {
  customer: null,
};

export default Customer;

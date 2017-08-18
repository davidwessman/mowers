import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import IconButton from 'components/icon_button';
import CustomerForm from 'components/customers/form';
import * as states from 'constants/states';

class Customer extends React.Component {
  render() {
    const actions = this.props.actions;
    let customer = this.props.customer.data;

    switch (this.props.customer.state) {
      case states.SELECTED:
        return (
          <div className="column is-6">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  Kund
                </p>
                <IconButton
                  onClick={this.props.actions.onCustomerDeselect}
                  icon={'times'}
                  text={'Avmarkera'}
                  class={'card-header-icon'}
                />
              </header>
              <div className="card-content">
                <div className="media">
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
                </div>
              </div>
            </div>
          </div>
        );
      case states.NEW:
        return (
          <CustomerForm
            status={states.NEW}
            title={'Ny kund'}
            customer={customer}
            errors={this.props.customer.errors}
            onFormSubmit={actions.newCustomerSubmit}
            onInputChange={actions.newCustomerInputChange}
            onBlur={actions.newCustomerSearch}
          />
        );

      case states.EDIT:
        customer = this.props.customer.edit_data;
        const reset = (
          <IconButton
            onClick={this.props.actions.onCustomerDeselect}
            icon={'times'}
            text={'Avmarkera'}
            class={'card-header-icon'}
          />
        );
        return (
          <CustomerForm
            status={states.EDIT}
            title={'Redigera kund'}
            header={reset}
            customer={customer}
            errors={this.props.customer.errors}
            onFormSubmit={actions.editCustomerSubmit}
            onInputChange={actions.editCustomerInputChange}
          />
        );

      default:
        return null;
    }
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

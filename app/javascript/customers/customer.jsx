import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';
import Icon from 'components/icon';
import EditCustomer from 'customers/edit';

class Customer extends React.Component {
  render() {
    if (this.props.customer.id === undefined) return null;

    if (this.props.edit) {
      return (
        <div className="column is-6">
          <EditCustomer
            customer={this.props.customer}
            onUpdate={this.props.onUpdate}
            onInput={this.updateCustomer}
          />
        </div>
      );
    }

    return (
      <div className="column is-6">
        <div className="card customer">
          <header className="card-header">
            <p className="card-header-title">
              Kund
            </p>
            <a
              role="button"
              className="card-header-icon"
              onClick={this.props.onDeselect}
              tabIndex={-1}
            >
              Avmarkera &nbsp;
              <Icon icon="times" />
            </a>
          </header>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{this.props.customer.name}</p>
                <ul>
                  <li><Icon icon="phone" />{this.props.customer.phone}</li>
                  <li><Icon icon="home" />{this.props.customer.address}</li>
                  <li><Icon icon="envelope" /> {this.props.customer.email}</li>
                  <li><Icon icon="hashtag" />{`Kund: ${this.props.customer.id}`}</li>
                </ul>
                <a
                  role="button"
                  className="button is-primary"
                  onClick={this.props.onEditClick}
                  tabIndex={0}
                >
                  Redigera &nbsp;
                  <Icon icon="wrench" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Customer.propTypes = {
  customer: PropTypes.shape(PropHelper.customer()).isRequired,
  edit: PropTypes.bool,
  onDeselect: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

Customer.defaultProps = {
  edit: false,
};

export default Customer;

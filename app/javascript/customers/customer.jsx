import React from 'react';
import PropTypes from 'prop-types';
import PropHelper from 'components/prop_helper';
import Icon from 'components/icon';

class Customer extends React.Component {
  render() {
    if (this.props.customer.id === undefined) return null;

    return (
      <div className="column is-6">
        <div className="card customer">
          <header className="card-header">
            <p className="card-header-title">
              Kund
            </p>
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
};

export default Customer;

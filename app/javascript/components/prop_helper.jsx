import PropTypes from 'prop-types';

class PropHelper {
  static brands() {
    return ({
      value: PropTypes.string,
      label: PropTypes.string,
    });
  }

  static customer() {
    return ({
      address: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string,
    });
  }

  static mower() {
    return ({
      brand: PropTypes.string,
      model: PropTypes.string,
      year: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      customer_id: PropTypes.number,
    });
  }
}

export default PropHelper;

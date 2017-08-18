import React from 'react';
import PropTypes from 'prop-types';
import ErrorField from 'components/error_field';
import Icon from 'components/icon';

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.main = this.main.bind(this);
  }

  main() {
    // if (this.props.loading) return <Icon icon={'spinner'} spin />;
    return (
      <input
        key={`${this.props.id}-${this.props.status}`}
        className="input"
        type={this.props.type}
        placeholder={this.props.title}
        name={this.props.id}
        defaultValue={this.props.value}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
      />
    );
  }
  render() {
    let error = null;
    if (this.props.error) {
      error = <ErrorField message={this.props.error} />;
    }

    return (
      <div className="field">
        <label className="label" htmlFor={this.props.id}>{this.props.title}</label>
        <p className="control">
          {this.main()}
        </p>
        {error}
      </div>
    );
  }
}

InputField.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  status: PropTypes.string,
};

InputField.defaultProps = {
  status: '',
  loading: false,
  error: null,
  value: '',
  onBlur: () => {},
};


export default InputField;

import React from 'react';
import PropTypes from 'prop-types';

class TextInput extends React.Component {
  render() {
    return (
      <div className="sdc-isolation field">
        <label className="label" htmlFor="text-input">{this.props.label}
        </label>
        <input ref={ip => (this.myInput = ip)} value={this.props.value} autoFocus={this.props.autoFocus} className="input input--text" onChange={this.props.onChange} type="text" id={this.props.id} />
      </div>
    );
  }
}

TextInput.defaultProps = {
  autoFocus: false,
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextInput;

import React from 'react';
import PropTypes from 'prop-types';

class TextInput extends React.Component {
  render() {
    // This is to fix an issue where if this.props.value is undefined, the previous
    // value of this.props.value is used.
    let value = this.props.value;
    if (this.props.value === undefined) {
      value = '';
    }
    return (
      <div className="sdc-isolation field">
        <label className="label" htmlFor="text-input">{this.props.label}
        </label>
        <input style={{ width: '100%' }} ref={ip => (this.myInput = ip)} value={value} autoFocus={this.props.autoFocus} className="input input--text" onChange={this.props.onChange} type="text" id={this.props.id} />
      </div>
    );
  }
}

TextInput.defaultProps = {
  autoFocus: false,
  value: '',
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  value: PropTypes.string,
};

export default TextInput;

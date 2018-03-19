import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class TextInput
 *
 * @param {String} id
 * @param {String} type - search/postCode etc.
 * @param {String} label
 * @param {Boolean} autoFocus
 * @param {String} value
 */
class TextInput extends React.Component {
  render() {
    const width = (this.props.size === 'xs') ? { width: '100%' } : {};
    return (
      <div className={`field u-mb-${this.props.size}`}>
        <label className="label" htmlFor={this.props.id}>{this.props.label}</label>
        <input
          id={this.props.id}
          style={width}
          onChange={this.props.onChange}
          value={this.props.value}
          autoFocus={this.props.autoFocus}
          ref={ip => (this.myInput = ip)}
          className={`input input--text input-type__input bi-${this.props.type}-input`}
          type="text"
        />
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
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export default TextInput;

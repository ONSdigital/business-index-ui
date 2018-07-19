import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class TextInput - For inputting text. This can be used either using
 * onChange/value props or through using refs (hence why this isn't a
 * functional component).
 */
class TextInput extends React.Component {
  render = () => {
    const width = (this.props.size === 'xs') ? { width: '92%' } : {};
    const conditionalProps = (this.props.onChange === null)
      ? {}
      : { onChange: this.props.onChange, value: this.props.value };
    return (
      <div className={`field ${this.props.size}`}>
        {(this.props.legend !== null) &&
          <legend className="neptune">{this.props.legend}</legend>
        }
        <label className={this.props.labelClass} htmlFor={this.props.id}>{this.props.label}</label>
        <input
          id={this.props.id}
          style={width}
          {...conditionalProps}
          autoFocus={this.props.autoFocus}
          ref={ip => (this.textInput = ip)}
          className={`input input--text input-type__input ${this.props.type}`}
          type={this.props.type}
        />
      </div>
    );
  }
}

TextInput.defaultProps = {
  autoFocus: false,
  value: '',
  onChange: null,
  legend: null,
  labelClass: 'label',
  size: '',
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.string,
  labelClass: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  legend: PropTypes.string,
};

export default TextInput;

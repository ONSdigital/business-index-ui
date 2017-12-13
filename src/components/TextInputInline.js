import React from 'react';
import PropTypes from 'prop-types';

class TextInputInline extends React.Component {
  // Used the sdc grid in this component as the inputs inherit various styles, which is difficult
  // to fix when inheriting from the externa pattern library styles.
  constructor(props) {
    super(props);
    this.state = {
      value: this.formValue(this.props.value),
    };
    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // onClear, reset the values
    if (this.props.value !== nextProps.value) {
      this.setState({ value: this.formValue(nextProps.value) });
    }
  }
  onChange(evt) {
    const value = this.state.value;
    if (evt.target.id === `${this.props.id}-min`) {
      value[0] = evt.target.value;
    } else if (evt.target.id === `${this.props.id}-max`) {
      value[1] = evt.target.value;
    }
    const json = {
      target: {
        value,
        id: this.props.id,
      },
    };
    this.setState({ value });
    this.props.onChange(json);
  }
  formValue(value) {
    if (value === undefined) {
      return ['', ''];
    }
    return value;
  }
  render() {
    return (
      <div className="sdc-isolation field">
        <label className="label" htmlFor="text-input">{this.props.label}
        </label>
        <div className="grid grid--spaced" style={{ margin: '0', padding: '0', border: '' }}>
          <div className="grid__col col-6@l col-6@m col-6@s" style={{ margin: '0', padding: '0' }}>
            <div className="grid__helper" style={{ backgroundColor: '#EAEAEA', margin: '0', padding: '0' }}>
              <input style={{ width: '100%' }} placeholder={this.props.placeholderMin} ref={ip => (this.myInput = ip)} value={this.state.value[0]} autoFocus={this.props.autoFocus} className="input input--text" onChange={this.onChange} type="text" id={`${this.props.id}-min`} />
            </div>
          </div>
          <div className="grid__col col-6@l col-6@m col-6@s">
            <div className="grid__helper" style={{ backgroundColor: '#EAEAEA', margin: '0', padding: '0' }}>
              <input style={{ width: '100%' }} placeholder={this.props.placeholderMax} value={this.state.value[1]} className="input input--text" onChange={this.onChange} type="text" id={`${this.props.id}-max`} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TextInputInline.defaultProps = {
  value: undefined,
};

TextInputInline.propTypes = {
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholderMin: PropTypes.string.isRequired,
  placeholderMax: PropTypes.string.isRequired,
  value: PropTypes.array,
};

export default TextInputInline;

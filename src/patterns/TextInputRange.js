import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class TextInputRange - This component initially shows 1 text input, with a
 * checkbox toggle for adding another text input so that two values (a range)
 * can be input.
 *
 * @todo: it would probably be best to refactor this, don't have this component
 * handling the switch between 2 text inputs to 1 etc.
 */
class TextInputRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      range: false,
      value: this.props.value,
    };
  }
  onChangeFilter = () => {
    const value = this.state.value;
    if (!this.state.range) {
      // Going from single to range - copy over the single value if it exists
      value.min = value.single;
      value.single = '';
      value.max = '';
    } else {
      // Going from range to single, copy the min value to single if it exists
      value.single = value.min;
      value.min = '';
      value.max = '';
    }
    this.setState({ ...this.state, value, range: !this.state.range });
  }
  onChange = (evt) => {
    const value = {};
    if (evt.target.id === this.props.id) {
      value.min = this.state.value.min;
      value.max = this.state.value.max;
      value.single = evt.target.value;
    } else if (evt.target.id === `${this.props.id}-min`) {
      value.min = evt.target.value;
      value.max = this.state.value.max;
      value.single = this.state.value.single;
    } else if (evt.target.id === `${this.props.id}-max`) {
      value.min = this.state.value.min;
      value.max = evt.target.value;
      value.single = this.state.value.single;
    }
    this.setState({ ...this.state, value });
    const json = {
      target: {
        value,
        id: this.props.id,
      },
    };
    this.props.onChange(json);
  }
  // render = () => (
  //   <div className={`field ${this.props.size}`}>
  //     <label className={this.props.labelClass} htmlFor={this.props.id}>{this.props.label}</label>
  //     <div className={`field--toggle ${this.props.checkBoxSize}`}>
  //       <label className="label label--inline venus field__label" htmlFor="rangeToggle">{this.props.toggleText}</label>
  //       <input id="rangeToggle" checked={this.state.range} onChange={this.onChangeFilter} className="field__input input input--checkbox" type="checkbox" />
  //     </div>
  //     {!this.state.range &&
  //       <div id="single">
  //         <input id={`${this.props.id}`} value={this.props.value.single} onChange={this.onChange} className="input input--text input-type__input bi-postcode-input-edit" type="text" />
  //       </div>
  //     }
  //     {this.state.range &&
  //       <div style={{ height: '45px' }}>
  //         <input id={`${this.props.id}-min`} value={this.props.value.min} onChange={this.onChange} className="input input--text input-type__input bi-sic-input" type="text" placeholder="From" />
  //         <input id={`${this.props.id}-max`} value={this.props.value.max} onChange={this.onChange} className="input input--text input-type__input bi-sic-input second" type="text" placeholder="To" />
  //       </div>
  //     }
  //   </div>
  // );
  render = () => (
    <div className="field">
      <label className="label input-margin-sic">Industry classification (SIC)</label>
        <div className="field--toggle sml">
          <label className="label label--inline venus field__label" htmlFor="showPasswordToggle">Search range</label>
          <input id="showPasswordToggle" className="field__input input input--checkbox" type="checkbox" />
        </div>
        <div id="single">
          <input className="input input--text input-type__input bi-postcode-input-edit" type="text" id="text-input" />
        </div>
        <div id="range">
          <input className="input input--text input-type__input bi-sic-input-edit-landscape" type="text" id="text-input" placeholder="From" />
          <input className="input input--text input-type__input bi-sic-input-edit-landscape second" type="text" id="text-input" placeholder="To"/>
        </div>
    </div>
  );
}

TextInputRange.defaultProps = {
  value: { min: '', max: '', single: '' },
  size: '',
  labelClass: 'label',
  checkBoxSize: '',
};

TextInputRange.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  toggleText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
  size: PropTypes.string,
  labelClass: PropTypes.string,
  checkBoxSize: PropTypes.string,
};

export default TextInputRange;

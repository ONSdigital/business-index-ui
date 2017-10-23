import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'registers-react-library';
import '../resources/css/sdc-isolation.css';

class MatchForm extends React.Component {
  render() {
    return (
      <div>
        <div className="sdc-isolation field">
          <label className="label" htmlFor="text-input">Business Name
          </label>
          <input className="input input--text" type="text" id="text-input" />
        </div>
        <br />
        <div className="sdc-isolation field">
          <label className="label" htmlFor="text-input">VAT Number
          </label>
          <input className="input input--text" type="text" id="text-input" />
        </div>
        <br />
        <div className="sdc-isolation field">
          <label className="label" htmlFor="text-input">PAYE Number
          </label>
          <input className="input input--text" type="text" id="text-input" />
        </div>
        <br />
        <div className="sdc-isolation field">
          <label className="label" htmlFor="text-input">Company Number
          </label>
          <input className="input input--text" type="text" id="text-input" />
        </div>
        <br />
        <div className="sdc-isolation field">
          <label className="label" htmlFor="text-input">Industry Code
          </label>
          <input className="input input--text" type="text" id="text-input" />
        </div>
        <br />
        <div className="sdc-isolation field field--select">
          <label className="label" htmlFor="select">Employment Bands
          </label>
          <select className="input input--select" id="select" name="select" style={{ padding: '0.3rem', fontSize: '1rem' }}>
            <option selected disabled>Select an option</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
        <br />
        <div className="sdc-isolation field field--select">
          <label className="label" htmlFor="select">Legal Status
          </label>
          <select className="input input--select" id="select" name="select" style={{ padding: '0.3rem', fontSize: '1rem' }}>
            <option selected disabled>Select an option</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
        <br />
        <div className="sdc-isolation field field--select">
          <label className="label" htmlFor="select">Turnover
          </label>
          <select className="input input--select" id="select" name="select" style={{ padding: '0.3rem', fontSize: '1rem' }}>
            <option selected disabled>Select an option</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
        <br />
        <div className="sdc-isolation field field--select">
          <label className="label" htmlFor="select">Trading Status
          </label>
          <select className="input input--select" id="select" name="select" style={{ padding: '0.3rem', fontSize: '1rem' }}>
            <option selected disabled>Select an option</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
        <br />
        <div className="sdc-isolation field">
          <label className="label" htmlFor="text-input">Post Code
          </label>
          <input className="input input--text" type="text" id="text-input" />
        </div>
        <br />
        <Button id="loginButton" size="wide" text="Search" onClick={!this.props.currentlySending ? this.props.onSubmit : null} ariaLabel="Login Button" type="submit" loading={this.props.currentlySending} />
      </div>
    );
  }
}

MatchForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  valid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default MatchForm;

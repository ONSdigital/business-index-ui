import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'registers-react-library';
import TextInput from './TextInput';

class UBRNForm extends React.Component {
  render() {
    return (
      <form>
        <TextInput ref={ip => (this.childTextInput = ip)} value={this.props.value} label="UBRN" id="UBRN" autoFocus onChange={this.props.onChange} /><br />
        <Button id="loginButton" size="wide" text="Search" onClick={!this.props.currentlySending ? this.props.onSubmit : null} ariaLabel="Login Button" type="submit" loading={this.props.currentlySending} />
        &nbsp;
        <Button id="clearButton" size="wide" text="Clear" onClick={this.props.onClear} ariaLabel="Clear Button" type="reset" />
        <br /><br />
      </form>
    );
  }
}

UBRNForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default UBRNForm;

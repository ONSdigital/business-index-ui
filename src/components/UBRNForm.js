import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'registers-react-library';
import TextInput from './TextInput';
import CheckBoxInput from './CheckBoxInput';

class UBRNForm extends React.Component {
  render() {
    return (
      <form>
        <div className="sdc-isolation field">
          <div className="grid grid--tight">
            <div className="grid__col col-6@m">
              <div className="grid__helper" style={{ backgroundColor: '#EAEAEA', margin: '0', padding: '0' }}>
                <TextInput ref={ip => (this.childTextInput = ip)} value={this.props.initialValues.id} label="UBRN" id="id" autoFocus onChange={this.props.onChange} /><br />
              </div>
            </div>
          </div>
        </div>
        <br />
        <Button id="loginButton" size="wide" text="Search" onClick={!this.props.currentlySending ? this.props.onSubmit : null} ariaLabel="Login Button" type="submit" loading={this.props.currentlySending} />
        &nbsp;
        <Button id="clearButton" size="wide" text="Clear" onClick={this.props.onClear} ariaLabel="Clear Button" type="reset" />
        <br /><br />
        {this.props.showFilters &&
          <div className="sdc-isolation field">
            <div className="grid grid--tight" style={{ margin: '0', padding: '0' }}>
              <div className="grid__col col-3@m">
                <CheckBoxInput value={this.props.convertBands} label="Convert Bands" id="ConvertBandsCheckbox" onChangeFilter={this.props.onChangeBands} />
              </div>
            </div>
          </div>
        }
      </form>
    );
  }
}

UBRNForm.defaultProps = {
  convertBands: true,
};

UBRNForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  showFilters: PropTypes.bool.isRequired,
  onChangeBands: PropTypes.func.isRequired,
  convertBands: PropTypes.bool,
};

export default UBRNForm;

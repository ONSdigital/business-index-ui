import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'registers-react-library';
import TextInput from './TextInput';

class UBRNForm extends React.Component {
  // For the id of each input, we use the same name as the business-index-api input
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


// class UBRNForm extends React.Component {
//   render() {
//     const spinner = (<Loader color="#FFFFFF" size="10px" margin="0px" />);
//     const icon = (<span className="icon icon-search--light"></span>);
//     const buttonContent = (this.props.currentlySending) ? spinner : icon;
//     return (
//       <form className="col-wrap search__form" action="/search" method="get">
//         <label className="search__label col col--md-5 col--lg-6" htmlFor="nav-search">UBRN</label>
//         <input ref={ip => (this.myInput = ip)} placeholder="Enter UBRN to search..." autoFocus onChange={this.props.onChange} type="search" autoComplete="on" className="search__input col col--md-21 col--lg-32" id="nav-search" name="q" value={this.props.value} />
//         <button onClick={!this.props.currentlySending ? this.props.onSubmit : null} aria-label="Search UBRN button" type="submit" className={`search__button col--md-3 col--lg-3 ${this.props.valid}`} id="nav-search-submit">
//           {buttonContent}
//         </button>
//       </form>
//     );
//   }
// }

// UBRNForm.propTypes = {
//   currentlySending: PropTypes.bool.isRequired,
//   onSubmit: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   valid: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
// };

// export default UBRNForm;

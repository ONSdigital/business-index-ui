import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, resetLoginErrorMsg } from '../actions/LoginActions';
import Button from '../patterns/Button';
import LinkButton from '../patterns/LinkButton';
import ErrorModal from '../components/ErrorModal';
import { focusAndSetState } from '../utils/helperMethods';

/**
 * @class Login - The Login page and associated login logic
 *
 * @param {Object} dispatch
 * @param {Boolean} currentlySending - True if a login request is in progress
 * @param {String} errorMessage - The error message from the login request
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      showForgotPass: false,
      errorMessage: '',
    };
    this.closeErrorModal = this.closeErrorModal.bind(this);
    this.closeForgotPassModal = this.closeForgotPassModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit = (evt) => {
    evt.preventDefault(); // Stop the page from refreshing
    this.props.dispatch(login(this.usernameInput.value, this.passwordInput.value));
    // The error modal won't show unless there is also an error message that isn't an empty string
    this.setState({ showError: true });
  }
  closeErrorModal = () => {
    // We need to reset the error message as the error modal will show on a future
    // successful login if we don't reset it
    this.props.dispatch(resetLoginErrorMsg());
    focusAndSetState(this, 'usernameInput', { showError: false, errorMessage: '' });
  }
  closeForgotPassModal = () => focusAndSetState(this, 'usernameInput', { showForgotPass: false });
  render() {
    const forgotPassMsg = "If you have forgotten your password, please raise a Service Desk call to get it reset.";
    return (
      <div className="main-content">
        <div className="wrapper">
          <div className="group">
            <div className="col-12">
              <form id="form-sign-in" className="form">
                <h3 className="saturn">Sign in</h3>
                <div className="field u-mb-s">
                  <label className="label">Username</label>
                  <input autoFocus className="input input--text input-type__input" ref={(ref) => (this.usernameInput = ref)} required type="username" aria-describedby="inputUsernameLabel" />
                </div>
                <div className="field">
                  <label className="label " htmlFor="inputPassword" id="inputPasswordLabel">Password</label>
                  <input id="inputPassword" type="password" className="input input--text" ref={(ref) => (this.passwordInput = ref)} required aria-describedby="inputPasswordLabel" />
                </div>
                <p className="forgot-password">
                  <LinkButton id="forgotPasswordLink" text="Forgot password?" onClick={() => this.setState({ showForgotPass: true })} />
                </p>
                <ErrorModal show={this.state.showForgotPass} message={forgotPassMsg} close={this.closeForgotPassModal} />
                <Button id="loginButton" type="submit" size="thin" text="Sign in" onClick={this.onSubmit} ariaLabel="Sign In Button" loading={this.props.currentlySending} />
                <ErrorModal show={this.state.showError && this.props.errorMessage !== ''} message={this.props.errorMessage} close={this.closeErrorModal} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentlySending: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

function select(state) {
  return {
    currentlySending: state.login.currentlySending,
    errorMessage: state.login.errorMessage,
  };
}

export default connect(select)(Login);
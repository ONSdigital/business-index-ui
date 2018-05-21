import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../history';
import { login, resetLoginErrorMsg } from '../actions/LoginActions';
import Button from '../patterns/Button';
import LinkButton from '../patterns/LinkButton';
import TextInput from '../patterns/TextInput';
import Panel from '../patterns/Panel';

/**
 * @class Login - The Login page and associated login logic.
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      showForgotPass: false,
      errorMessage: '',
    };
  }
  componentDidMount = () => {
    // We don't want to allow the user to access the login page if they're already logged in
    if (this.props.loggedIn) history.push('/Home');
  }
  onSubmit = (evt) => {
    evt.preventDefault(); // Stop the page from refreshing
    this.props.dispatch(login(this.usernameInput.textInput.value, this.passwordInput.textInput.value));
    // The error modal won't show unless there is also an error message that isn't an empty string
    this.setState({ ...this.state, showError: true });
  }
  closeErrorModal = () => {
    // We need to reset the error message as the error modal will show on a future
    // successful login if we don't reset it
    this.props.dispatch(resetLoginErrorMsg());
    this.setState({ ...this.state, showError: false, errorMessage: '' });
    this.usernameInput.textInput.focus();
  }
  closeForgotPassModal = () => this.setState({ ...this.state, showForgotPass: false });
  render = () => {
    const forgotPassMsg = 'If you have forgotten your password, please raise a Service Desk call to get it reset.';
    return (
      <div className="main-content">
        <div className="wrapper">
          <div className="group">
            <div className="col-12">
              <form id="form-sign-in" className="form">
                <h3 className="saturn">Sign in</h3>
                <TextInput id="usernameInput" size="s" onChange={null} ref={(ref) => (this.usernameInput = ref)} autoFocus type="username" label="Username" />
                <TextInput id="passwordInput" size="s" onChange={null} ref={(ref) => (this.passwordInput = ref)} type="password" label="Password" />
                <p className="forgot-password">
                  <LinkButton id="forgotPasswordLink" text="Forgot password?" onClick={() => this.setState({ ...this.state, showForgotPass: true })} />
                </p>
                <Button className="btn btn--primary venus btn--wide" id="loginButton" type="submit" text="Sign in" onClick={this.onSubmit} ariaLabel="Sign In Button" loading={this.props.currentlySending} />
                <Panel id="forgotPassPanel" text={forgotPassMsg} level="info" show={this.state.showForgotPass} close={this.closeForgotPassModal} marginBottom="1rem" />
                <Panel id="loginErrorPanel" text={this.props.errorMessage} level="info" show={this.state.showError && this.props.errorMessage !== ''} close={this.closeErrorModal} marginBottom="1rem" />
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
  loggedIn: PropTypes.bool.isRequired,
};

const select = (state) => ({
  currentlySending: state.login.currentlySending,
  errorMessage: state.login.errorMessage,
  loggedIn: state.login.loggedIn,
});

export default connect(select)(Login);

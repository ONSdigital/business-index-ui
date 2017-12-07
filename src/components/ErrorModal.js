import React from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

class ErrorModal extends React.Component {
  componentWillMount() {
    window.addEventListener('keydown', this.props.close);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.close);
  }
  render() {
    const modal = (this.props.show) ? (<ModalContainer onClose={this.props.close()}>
      <ModalDialog style={{ width: '80%' }} onClose={this.props.close()}>
        <h1 style={{ margin: '10px' }}>{this.props.message}</h1>
        <br />
        <button className="btn btn--primary" autoFocus onClick={this.props.close()}>Close</button>
      </ModalDialog>
    </ModalContainer>) : <div></div>;
    return (
      <div>
        {modal}
      </div>
    );
  }
}

ErrorModal.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default ErrorModal;

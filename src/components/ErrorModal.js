import React from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

const ErrorModal = ({ show, message, close }) => {
  const modal = (show) ? (<ModalContainer onClose={() => close()}>
    <ModalDialog style={{ width: '80%' }} onClose={() => close()}>
      <h1 style={{ margin: '10px' }}>{message}</h1>
      <br />
      <button className="btn btn--primary" autoFocus onClick={() => close()}>Close</button>
    </ModalDialog>
  </ModalContainer>) : <div></div>;
  return (
    <div>
      {modal}
    </div>
  );
};

ErrorModal.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default ErrorModal;

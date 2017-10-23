import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ strong, message, warningLevel }) => {
  return (
    <Alert bsStyle={warningLevel}>
      <strong>{strong}</strong> {message}
    </Alert>
  );
};


AlertMessage.propTypes = {
  strong: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  warningLevel: PropTypes.string.isRequired,
};

export default AlertMessage;

import React from 'react';
import PropTypes from 'prop-types';

/**
 * @const Panel - An ONS style Panel
 *
 * https://sdc-global-design-patterns.netlify.com/components/detail/panel.html
 */
const Panel = ({ id, level, text, show, close, marginBottom }) => {
  const closeButton = (close !== null) ? (<a style={{ cursor: 'pointer' }} onClick={close}>Close</a>) : null;
  const panel = (show) ? (<div style={{ marginBottom: '0rem' }} id={id} className={`panel panel--simple panel--${level} u-mb-m`}>
    <p className="mars" style={{ marginBottom: '1rem' }}>{text} {closeButton}</p>
  </div>) : null;
  return (
    <div style={{ marginBottom, overflow: 'hide' }}>
      {panel}
    </div>
  );
};

Panel.defaultProps = {
  marginBottom: '1rem',
  show: true,
  close: null,
};

Panel.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  show: PropTypes.bool,
  close: PropTypes.func,
  marginBottom: PropTypes.string,
};

export default Panel;

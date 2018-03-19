import React from 'react';
import PropTypes from 'prop-types';

/**
 * @const Panel - An ONS style Panel
 *
 * https://sdc-global-design-patterns.netlify.com/components/detail/panel.html
 *
 * @param {String} id
 * @param {String} text
 * @param {String} level - info/success/warn/error
 *
 * @return {Object}
 */
const Panel = ({ id, level, text }) => (
  <div id={id} className={`panel panel--simple panel--${level} u-mb-l`}>
    <p className="mars" style={{ marginBottom: '1rem' }}>{text}</p>
  </div>
);

Panel.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
};

export default Panel;

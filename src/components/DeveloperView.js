import React from 'react';
import PropTypes from 'prop-types';

const DeveloperView = ({ enterprise }) => {
  return (
    <div>
      <pre>{JSON.stringify(enterprise, null, 2) }</pre>
    </div>
  );
};

DeveloperView.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default DeveloperView;

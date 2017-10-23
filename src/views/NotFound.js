import React from 'react';
import { TitleAndDescription, BreadCrumb } from 'registers-react-library';

const NotFound = () => {
  return (
    <div>
      <BreadCrumb
        breadCrumbItems={[
          { name: 'Home', link: '/Home' },
          { name: 'Not Found', link: '' },
        ]}
      />
      <TitleAndDescription
        title="404 Not Found"
        description="Please navigate to a valid URL."
        marginBottom="1"
      />
    </div>
  );
};

export default NotFound;

import React from 'react';
import { TitleAndDescription, BreadCrumb } from 'registers-react-library';

const Accessibility = () => {
  return (
    <div>
      <BreadCrumb
        breadCrumbItems={[
          { name: 'Home', link: '/Home' },
          { name: 'Accessibility', link: '' },
        ]}
      />
      <TitleAndDescription
        title="Accessibility"
        description="Accessibility details etc."
        marginBottom="1"
      />
    </div>
  );
};

export default Accessibility;

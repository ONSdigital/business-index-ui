import React from 'react';
import { TitleAndDescription, BreadCrumb } from 'registers-react-library';

const WhatIsBi = () => {
  const items = [
    { name: 'Home', link: '/Home' },
    { name: 'What Is BI', link: '' },
  ];
  return (
    <div>
      <BreadCrumb breadCrumbItems={items} />
      <TitleAndDescription
        marginBottom="1"
        title="What is the Business Index?"
        description="Business Index details etc."
      />
    </div>
  );
};

export default WhatIsBi;

import React from 'react';
import { TitleAndDescription, BreadCrumb } from 'registers-react-library';

const ContactUs = () => {
  return (
    <div>
      <BreadCrumb
        breadCrumbItems={[
          { name: 'Home', link: '/Home' },
          { name: 'Contact Us', link: '' },
        ]}
      />
      <TitleAndDescription
        title="Contact Us"
        description="Contact Us details etc."
        marginBottom="1"
      />
    </div>
  );
};

export default ContactUs;

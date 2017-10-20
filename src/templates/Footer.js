import React from 'react';
import { Footer } from 'registers-react-library';

const FooterTemplate = () => {
  return (
    <Footer
      footerSection={[
        { title: 'Help', items: [{ text: 'Accessibility', link: '/Accessibility' }] },
        { title: 'About BI', items: [{ text: 'What is BI', link: '/WhatIsBI' }] },
        { title: 'Connect with us', items: [{ text: 'business.index@ons.gov.uk', emailHref: 'mailto:business.index@ons.gov.uk?subject=SBR&body=message%20goes%20here' }] },
      ]}
    />
  );
};

export default FooterTemplate;

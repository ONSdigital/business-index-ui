import React from 'react';

/**
 * @const FooterTemplate - The footer, which only shows a feedback prompt
 */
const FooterTemplate = () => (
  <footer className="page__footer">
    <div className="wrapper">
      <div className="group">
        <div className="col-12">
          <span className="pluto">This release is in development. Your <a href="mailto:Register@ons.gov.uk?Subject=User%20feedback"> feedback</a> will help us improve it.</span>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterTemplate;

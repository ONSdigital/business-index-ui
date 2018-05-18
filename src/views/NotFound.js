import React from 'react';
import DocumentTitle from 'react-document-title';
import Panel from '../patterns/Panel';

/**
 * @const NotFound - This is displayed whenever a user tries to
 * go to an unkown route.
 */
const NotFound = () => (
  <DocumentTitle title="Business Index - Not Found">
    <section>
      <div className="main-content">
        <div className="wrapper">
          <div className="group">
            <div className="col-8">
              <Panel
                id="notFoundPanel"
                text="404 Not Found"
                level="error"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </DocumentTitle>
);

export default NotFound;

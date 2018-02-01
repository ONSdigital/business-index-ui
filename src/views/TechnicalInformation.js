import React from 'react';
import { connect } from 'react-redux';
import { TitleAndDescription, BreadCrumb } from 'registers-react-library';

const TechnicalInformation = ({ uiVersion, apiVersion, uiLastUpdate, apiLastUpdate }) => {
  const items = [
    { name: 'Home', link: '/Home' },
    { name: 'Technical Information', link: '' },
  ];
  return (
    <div>
      <div>
        <BreadCrumb breadCrumbItems={items} />
        <TitleAndDescription
          title="Technical Information"
          description="Information regarding what versions are being used"
          marginBottom="1"
        />
      </div>
      <div className="page-content border-top--iron-sm border-top--iron-md">
        <div className="wrapper">
          <ul className="col-wrap col-span--lg-thirds tiles__list margin-top--double">
            <li className="col col--md-half col--lg-one-third background--mercury height--25-indented-ellipsis margin-top--0 margin-left-md--1 margin-bottom--2 padding-top--0 padding-right--0 padding-bottom--0 padding-left--0">
              <div className="min-height--10 background--gallery padding-top--2 padding-left--1 padding-right--1">
                <h2 className="flush">
                  UI Information
                </h2>
              </div>
              <div className="box__content padding-top--1 padding-right--1 padding-bottom--1 padding-left--1 border-top--iron-sm border-top--iron-md">
                UI Version - {uiVersion}
                <br /><br />
                UI Last Update - {uiLastUpdate}
              </div>
            </li>
            <li className="col col--md-half col--lg-one-third background--mercury height--25-indented-ellipsis margin-top--0 margin-left-md--1 margin-bottom--2 padding-top--0 padding-right--0 padding-bottom--0 padding-left--0">
              <div className="min-height--10 background--gallery padding-top--2 padding-left--1 padding-right--1">
                <h2 className="flush">
                  API Information
                </h2>
              </div>
              <div className="box__content padding-top--1 padding-right--1 padding-bottom--1 padding-left--1 border-top--iron-sm border-top--iron-md">
                API Version - {apiVersion}
                <br /><br />
                API Last Update - {apiLastUpdate}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

TechnicalInformation.propTypes = {
  uiVersion: React.PropTypes.string.isRequired,
  apiVersion: React.PropTypes.string.isRequired,
  uiLastUpdate: React.PropTypes.string.isRequired,
  apiLastUpdate: React.PropTypes.string.isRequired,
};

function select(state) {
  return {
    uiVersion: state.info.ui.version,
    apiVersion: state.info.api.version,
    uiLastUpdate: state.info.ui.lastUpdate,
    apiLastUpdate: state.info.api.lastApiUpdate,
  };
}

export default connect(select)(TechnicalInformation);

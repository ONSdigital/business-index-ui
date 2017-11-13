import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import RefSearchImage from '../resources/img/search.png';

const Home = ({ username, role, uiVersion, apiVersion }) => {
  const style = {
    width: '260px',
    height: '100px',
  };
  return (
    <div>
      <div className="page-intro background--astral">
        <div className="wrapper">
          <div className="col-wrap">
            <div className="col">
              <div className="col col--md-47 col--lg-34">
                <h1 className="page-intro__title page-intro__title--home"><span className="page-intro__title page-intro__title--home-big">
              Welcome to the</span> Business Index
              </h1>
                <p className="page-intro__content page-intro__content--home-big">
                  The Business Index is definitive list of the UK business population based on authoritative sources, for statistical use across Government.
                </p>
              </div>
              <div className="a-z col col--md-47 col--lg-23 col--lg-offset-2 margin-top-lg--3" style={{ textAlign: 'center' }}>
                <h2 className="margin-top-md--2">Useful Information</h2>
                <ul className="padding-left-lg--3">
                  <li className="a-z-list-item" style={style}>
                    <Link className="col col--md-7 col--lg-9 pad" to="/UserDetails">
                      User - {username}
                      <br /><br />
                      Role - {role}
                    </Link>
                  </li>
                  <li className="a-z-list-item" style={style}>
                    <Link className="col col--md-7 col--lg-9" to="/TechnicalInformation">
                      API Version - {apiVersion}
                      <br /><br />
                      UI Version - {uiVersion}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-content border-top--iron-sm border-top--iron-md">
        <div className="background--gallery" style={{ paddingBottom: '20px' }}>
          <div className="wrapper">
            <div className="tiles">
              <h2>Business Index Features</h2>
            </div>
            <div className="margin-top--2 col height-sm--48 col--md-14 col--lg-14 height-md--48 height-lg--48 background--white margin-bottom--2 js-hover-click">
              <div className="padding-left--1 padding-right--1 padding-top--2 padding-bottom--1">
                <div className="box__content box__content--homepage height-sm--19 height-md--19 height-md--44 padding-top-lg--17 padding-top-md--17">
                  <br /><br /><br />
                  <h2 className="tiles__title tiles__title-h2--home"><Link to="/Match">Match</Link></h2>
                  <span className="image-holder hide--sm width-lg--12 width-md--12"><Link to="/Match"><img src={RefSearchImage} style={{ width: '200px' }} alt="" className="no-border" /></Link></span>
                  <p className="margin-top-lg--1 margin-top-md--1">Match on business name</p>
                </div>
              </div>
            </div>
            <div className="margin-top--2 margin-left--2 col height-sm--48 col--md-14 col--lg-14 height-md--48 height-lg--48 background--white margin-bottom--2 js-hover-click">
              <div className="padding-left--1 padding-right--1 padding-top--2 padding-bottom--1">
                <div className="box__content box__content--homepage height-sm--19 height-md--19 height-md--44 padding-top-lg--17 padding-top-md--17">
                  <br /><br /><br />
                  <h2 className="tiles__title tiles__title-h2--home"><Link to="/RangeQuery">Range Query</Link></h2>
                  <span className="image-holder hide--sm width-lg--12 width-md--12"><Link to="/RangeQuery"><img src={RefSearchImage} style={{ width: '200px' }} alt="" className="no-border" /></Link></span>
                  <p className="margin-top-lg--1 margin-top-md--1">Search on a range of data fields</p>
                </div>
              </div>
            </div>
            <div className="margin-top--2 margin-left--2 col height-sm--48 col--md-14 col--lg-14 height-md--48 height-lg--48 background--white margin-bottom--2 js-hover-click">
              <div className="padding-left--1 padding-right--1 padding-top--2 padding-bottom--1">
                <div className="box__content box__content--homepage height-sm--19 height-md--19 height-md--44 padding-top-lg--17 padding-top-md--17">
                  <br /><br /><br />
                  <h2 className="tiles__title tiles__title-h2--home"><Link to="/UBRNLookup">UBRN Lookup</Link></h2>
                  <span className="image-holder hide--sm width-lg--12 width-md--12"><Link to="/UBRNLookup"><img src={RefSearchImage} style={{ width: '200px' }} alt="" className="no-border" /></Link></span>
                  <p className="margin-top-lg--1 margin-top-md--1">Exact match on Unique Business Reference Number</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  username: React.PropTypes.string.isRequired,
  role: React.PropTypes.string.isRequired,
  uiVersion: React.PropTypes.string.isRequired,
  apiVersion: React.PropTypes.string.isRequired,
};

function select(state) {
  return {
    username: state.login.username,
    role: state.login.role,
    uiVersion: state.info.ui.version,
    apiVersion: state.info.api.version,
  };
}

export default connect(select)(Home);

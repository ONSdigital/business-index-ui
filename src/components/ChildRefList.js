import React from 'react';
import PropTypes from 'prop-types';
import LinkButton from '../patterns/LinkButton';
import Panel from '../patterns/Panel';
import config from '../config/api-urls';
import accessAPI from '../utils/accessAPI';

const { REROUTE_URL, API_VERSION, BUSINESS_ENDPOINT } = config;

/**
 * @const ChildRefTable - This is a sub list of the child references of
 * a business that is displayed when a user clicks on the 'Show child
 * references' link. This component is only ever used as a child of
 * ChildSearchHOC which provides the loading/fetchData props.
 */
const ChildRefList = (props) => (
  <div style={{ padding: '20px' }}>
    <LinkButton id="expandRefs" className="mars" text={(props.isLoading) ? 'Loading...' : 'Show reference numbers'} onClick={props.fetchData} loading={false} />
    <Errorodal show={props.error} message={props.errorMessage} close={props.closeModal} />
    <Panel id="refsErrorPanel" text={this.state.errorMessage} level="error" show={this.state.error} close={null} marginBottom="1rem" />
    {props.finishedLoading &&
      <table>
        <tbody>
          {(props.data.companyNo !== '') &&
            <tr><th className="table-grey-text-reveal">CH</th><td>{props.createChLink(props.data.companyNo)}</td></tr>
          }
          { props.data.vatRefs.map(v => {
            return (<tr key={v}><th className="table-grey-text-reveal">VAT</th><td>{v}</td></tr>);
          }) }
          { props.data.payeRefs.map(p => {
            return (<tr key={p}><th className="table-grey-text-reveal">PAYE</th><td>{p}</td></tr>);
          }) }
        </tbody>
      </table>
    }
  </div>
);

ChildRefList.propTypes = {
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  finishedLoading: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  createChLink: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default ChildRefList;

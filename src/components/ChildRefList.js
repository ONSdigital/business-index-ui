import React from 'react';
import PropTypes from 'prop-types';
import ErrorModal from './ErrorModal';
import LinkButton from '../patterns/LinkButton';

/**
 * @const ChildRefTable - This is a sub list of the child references of
 * a business that is displayed when a user clicks on the 'Show child
 * references' link in the parent <Business /> component.
 */
const ChildRefList = (props) => (
  <div style={{ padding: '20px' }}>
    <LinkButton id="expandRefs" className="mars" text={(props.isLoading) ? 'Loading...' : 'Show reference numbers'} onClick={props.fetchData} loading={false} />
    <ErrorModal
      show={props.error}
      message={props.errorMessage}
      close={props.closeModal}
    />
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

import React from 'react';
import PropTypes from 'prop-types';
import Panel from '../patterns/Panel';
import Arrow from '../resources/img/icons--chevron-down.svg';

/**
 * @const ChildRefTable - This is a sub list of the child references of
 * a business that is displayed when a user clicks on the 'Show child
 * references' link. This component is only ever used as a child of
 * ChildSearchHOC which provides the loading/fetchData props.
 */
const ChildRefList = (props) => {
  const expandText = ((!props.finishedLoading) ? 'Show references' : 'Hide references');
  const showRefs = () => {
    // Rotate the arrow chevron
    const toggle = document.getElementById(`${props.data.id}-toggleLink`);
    toggle.style.transform = (toggle.style.transform === 'rotate(-90deg)') ? '' : 'rotate(-90deg)';
    props.fetchData();
  };
  return (
    <div id="outerExpand" className="guidance js-details">
      <a className="mars" style={{ padding: '5px', cursor: 'pointer', backgroundColor: ((props.finishedLoading) ? '#4263c2' : ''), color: ((props.finishedLoading) ? 'white' : '') }} onClick={() => showRefs()}>
        <img role="presentation" src={Arrow} id={`${props.data.id}-toggleLink`} style={{ transform: 'rotate(-90deg)', height: '20px' }} />
        {(props.isLoading) ? 'Loading...' : expandText}
      </a>
      <div id="guidance-answer-body" style={{ paddingLeft: '9px' }}>
        <Panel id="refsErrorPanel" text={props.errorMessage} level="error" show={props.error} close={null} marginBottom="1rem" />
        {props.finishedLoading &&
          <div className="guidance__content new">
            <table>
              <tbody>
                {(props.data.companyNo !== '') &&
                  <tr><th className="table-grey-text-reveal">CH</th><td>{props.createChLink(props.data.CompanyNo)}</td></tr>
                }
                { props.data.VatRefs.map(v => {
                  return (<tr key={v}><th className="table-grey-text-reveal">VAT</th><td>{v}</td></tr>);
                }) }
                { props.data.PayeRefs.map(p => {
                  return (<tr key={p}><th className="table-grey-text-reveal">PAYE</th><td>{p}</td></tr>);
                }) }
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
};

ChildRefList.propTypes = {
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  finishedLoading: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  createChLink: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default ChildRefList;

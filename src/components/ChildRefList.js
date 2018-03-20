import React from 'react';
import PropTypes from 'prop-types';
import ErrorModal from './ErrorModal';
import config from '../config/api-urls';
import accessAPI from '../utils/accessAPI';

const { REROUTE_URL, API_VERSION, BUSINESS_ENDPOINT } = config;

/**
 * @class ChildRefTable - This is a sub list of the child references of
 * a business that is displayed when a user clicks on the 'Show child
 * references' link in the parent <Business /> component.
 */
class ChildRefList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {},
      error: false,
      errorMessage: '',
    };
    this.fetchData(this.props.id);
  }
  fetchData = (id) => {
    this.props.onLoad(true);
    accessAPI(REROUTE_URL, 'POST', sessionStorage.accessToken, JSON.stringify({
      method: 'GET',
      endpoint: `${API_VERSION}/${BUSINESS_ENDPOINT}/${id}`,
    }), 'business')
    .then(json => {
      this.setState({ data: json, isLoading: false });
      this.props.onLoad(false);
    })
    .catch(() => {
      this.setState({ errorMessage: 'Error: Unable to get child references.', error: true, isLoading: false });
      this.props.onLoad(false);
    });
  }
  closeModal = () => this.setState({ error: false, errorMessage: '' });
  chLink = (id) => (<a target="_blank" rel="noopener noreferrer" href={`http://data.companieshouse.gov.uk/doc/company/${id}`}>{id}</a>);
  render = () => (
    <div style={{ padding: '20px' }}>
      <ErrorModal
        show={this.state.error}
        message={this.state.errorMessage}
        close={this.closeModal}
      />
      {!this.state.isLoading &&
        <table>
          <tbody>
            {(this.state.data.companyNo !== '') &&
              <tr><th className="table-grey-text-reveal">CH</th><td>{this.chLink(this.state.data.companyNo)}</td></tr>
            }
            { this.state.data.vatRefs.map(v => {
              return (<tr key={v}><th className="table-grey-text-reveal">VAT</th><td>{v}</td></tr>);
            }) }
            { this.state.data.payeRefs.map(p => {
              return (<tr key={p}><th className="table-grey-text-reveal">PAYE</th><td>{p}</td></tr>);
            }) }
          </tbody>
        </table>
      }
    </div>
  );
}

ChildRefList.propTypes = {
  id: PropTypes.number.isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default ChildRefList;

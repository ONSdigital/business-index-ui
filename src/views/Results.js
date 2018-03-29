import React from 'react';
import PropTypes from 'prop-types';
import Button from '../patterns/Button';
import Panel from '../patterns/Panel';
import ResultsTable from '../components/ResultsTable';
import ResultsList from '../components/ResultsList';
import ResultsSearchForm from '../components/ResultsSearchForm';
import { numberWithCommas } from '../utils/helperMethods';
import { downloadCSV, downloadJSON } from '../utils/export';

/**
 * @class Results - Results will be used with the SearchHOC which provides the correct
 * props that Results require (for the search + form). This page is shown once a search
 * has been made (or the user goes directly to /Results). In addition to showing the
 * search results, it shows an edit search form.
 *
 * @todo - The Panel for displaying how many results have been capped should be created
 * as a component
 */
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: false,
      showFilter: false,
    };
  }
  componentDidMount = () => this.scrollToResults();
  onSubmit = (e) => {
    e.preventDefault();
    // We need to pass e through so the parent e.preventDefault() will work
    this.props.onSubmit(e);
    this.scrollToResults();
  }
  scrollToResults = () => document.getElementById('homeTitle').scrollIntoView({ block: 'start', behavior: 'smooth' });
  render() {
    const capped = (<div style={{ marginLeft: '10px', display: 'inline-block' }} className="badge badge--amber">CAPPED</div>);
    const numResults = this.props.results.length;
    return (
      <section>
        <div className="landscape-search">
          <div className="wrapper">
            <div className="group">
              <div className="col-12 minus-margin">
                <p id="editSearchText" className="saturn">Edit search</p>
              </div>
            </div>
          </div>
          <ResultsSearchForm
            currentlySending={this.props.currentlySending}
            initialValues={this.props.query}
            onSubmit={this.onSubmit}
            onChange={this.props.onChange}
            onClear={this.props.onClear}
            value={this.props.query}
          />
        </div>
        <div className="main-content">
          <div className="wrapper">
            <div className="group">
              <div className="col-12">
                <h1 id="homeTitle" className="jupiter remove-margin">Search results</h1>
                {numResults !== 0 &&
                  <div className="field--toggle" style={{ float: 'right' }}>
                    <label className="label label--inline venus field__label" htmlFor="rangeToggle">List View</label>
                    <input id="rangeToggle" checked={this.state.listView} onChange={() => this.setState({ ...this.state, listView: !this.state.listView })} className="field__input input input--checkbox" type="checkbox" />
                  </div>
                }
                {!this.props.currentlySending &&
                  <div style={{ display: 'inline' }}>
                    <p style={{ display: 'inline' }} className="mars">We&apos;ve found {numberWithCommas(numResults)} {(numResults > 1 || numResults === 0) ? 'businesses' : 'business'}</p>
                    {(numResults === 10000) ? capped : null}
                  </div>
                }
                <div className="key-line"></div>
                <Panel id="searchErrorPanel" text={this.props.errorMessage} level="error" show={this.props.showError} close={this.props.closeModal} marginBottom="1rem" />
                {(numResults !== 0 && this.state.listView) &&
                  <ResultsList results={this.props.results} toHighlight={this.props.toHighlight} />
                }
                {(numResults !== 0 && !this.state.listView) &&
                  <ResultsTable
                    toHighlight={this.props.toHighlight}
                    convertBands
                    results={this.props.results}
                    showFilter={this.state.showFilter}
                    showPagination
                    defaultPageSize={10}
                  />
                }
                {(!this.props.currentlySending && this.props.results.length === 10000) &&
                  <div>
                    <br />
                    <div className="panel panel--warn">
                      <div className="panel__header">
                        <div className="venus">Warning</div>
                      </div>
                      <div className="panel__body">
                        <div>Your results have been capped at 10,000, from a total of {numberWithCommas(this.props.capped)} results</div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
            {numResults > 0 &&
              <div>
                <div className="key-line-download"></div>
                <h3 className="saturn">Download your search results</h3>
                <Button className="btn btn--primary venus btn--wide" id="downloadCsvButton" type="submit" text="CSV" onClick={() => downloadCSV(this.props.results)} ariaLabel="Download CSV Button" loading={false} />
                &nbsp;
                <Button className="btn btn--primary venus btn--wide" id="downloadJsonButton" type="submit" text="JSON" onClick={() => downloadJSON(this.props.results)} ariaLabel="Download JSON Button" loading={false} />
              </div>
            }
          </div>
        </div>
      </section>
    );
  }
}

Results.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  query: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  capped: PropTypes.string.isRequired,
  showError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  toHighlight: PropTypes.string.isRequired,
};

export default Results;

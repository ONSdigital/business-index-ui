import React from 'react';
import PropTypes from 'prop-types';
import Business from './Business';
import Pagination from '../patterns/Pagination';

/**
 * @class ResultsList - This component shows the search results as a list, which
 * is the default.
 */
class ResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 5,
      lower: 0,
      upper: 5,
      page: 1,
      numPages: Math.ceil(this.props.results.length / 5),
    };
  }
  handlePageChange = (offset) => {
    if (this.state.lower + offset >= 0 && this.state.upper + offset <= this.props.results.length + (this.state.pageSize - 1)) {
      const page = (offset === this.state.pageSize) ? this.state.page + 1 : this.state.page - 1;
      this.setState({
        ...this.state,
        upper: this.state.upper + offset,
        lower: this.state.lower + offset,
        page,
      });
    }
  };
  render = () => {
    const pagination = (<Pagination onChange={this.handlePageChange} page={this.state.page} pageSize={this.state.pageSize} numPages={this.state.numPages} />);
    return (
      <section>
        {pagination}
        {
          this.props.results.slice(this.state.lower, this.state.upper)
            .map(item => <Business key={item.id} business={item} toHighlight={this.props.toHighlight} />)
        }
        {pagination}
      </section>
    );
  }
}

ResultsList.propTypes = {
  results: PropTypes.array.isRequired,
  toHighlight: PropTypes.string.isRequired,
};

export default ResultsList;

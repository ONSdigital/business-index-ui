import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'halogen/PulseLoader';

class SearchRefForm extends React.Component {
  render() {
    const spinner = (<Loader color="#FFFFFF" size="10px" margin="0px" />);
    const icon = (<span className="icon icon-search--light"></span>);
    const buttonContent = (this.props.currentlySending) ? spinner : icon;
    return (
      <form className="col-wrap search__form" action="/search" method="get">
        <label className="search__label col col--md-5 col--lg-6" htmlFor="nav-search">Search</label>
        <input ref={ip => (this.myInput = ip)} placeholder="Enter ref to search..." autoFocus onChange={this.props.onChange} type="search" autoComplete="on" className="search__input col col--md-21 col--lg-32" id="nav-search" name="q" value={this.props.value} />
        <button onClick={!this.props.currentlySending ? this.props.onSubmit : null} aria-label="Search reference button" type="submit" className={`search__button col--md-3 col--lg-3 ${this.props.valid}`} id="nav-search-submit">
          {buttonContent}
        </button>
      </form>
    );
  }
}

SearchRefForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  valid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchRefForm;

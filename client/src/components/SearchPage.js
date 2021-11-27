import React, { Component } from 'react';
import { connect } from 'react-redux';

import setAuthToken from './../utils/setAuthToken';

import getVisibleResults from '../selectors/searchResults';

// Load components
import Loading from './Loading';
import Header from './header/Header';
import Results from './search/Results';
import SearchFilterForm from './form/SearchFilterForm';

// Load actions
import { setCurrentUserAsync } from '../actions/userActions';

class SearchPage extends Component {
  componentDidMount = () => {
    setAuthToken(localStorage.getItem('token'));
    // get current user
    if (!this.props.user._id) {
      this.props.setCurrentUserAsync();
    }
  }

  render() {
    const { path } = this.props.match;
    const { isFetchingResults } = this.props.search;

    return (
      <React.Fragment>
        <Header path={path} />
        <section className="section-search">
          {
            isFetchingResults ? (
              <div className="container u-margin-bottom-3rem">
                <Loading />
              </div>
            ) : (
                null
              )
          }

          <div className="container row">
            <div className="col-3-of-4">
              <Results results={this.props.visibleResults} />
            </div>

            <div className="col-1-of-4">
              <SearchFilterForm />
            </div>
          </div>  
        </section>
      </React.Fragment>
    )
  }
}
    
const mapStateToProps = state => ({
  user: state.user,
  search: state.search,
  visibleResults: state.search.generalResults
  // visibleResults: state.search.generalResults ? getVisibleResults(state.search.generalResults, state.filters) : []
});
      
const mapDispatchToProps = {
  setCurrentUserAsync
};
        
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
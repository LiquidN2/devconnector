import React, { Component } from 'react';
import { ControlledTextInput } from './ControlledInput';
import { connect } from 'react-redux'; 

import history from '../../routers/history';

// Load actions
import { searchAsync } from '../../actions/searchAction';
// import {response} from "express";

class UniversalSearchForm extends Component {

  state = {
    query: '',
    pageNumber: 1
  };

  onQueryChange = event => {
    const query = event.target.value;
    this.setState(() => {
      return { query }
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { query, pageNumber } = this.state;
    this.props.searchAsync(query, pageNumber);
    // fetch(`/api/search?q=${query}`).then(response => response.json()).then(data => console.log(data))
    history.push('/search');
  };

  render() {
    return (
      <form className="search" onSubmit={this.onSubmit}>
        <button 
          className="search__button search__icon" 
          type="submit"
        >
          <i className="fas fa-search"></i>
        </button>
        <ControlledTextInput
          className="search__input"
          fieldName="search"
          fieldValue={this.state.query}
          onChange={this.onQueryChange}
          placeholder="Search people's name or company"
        />
      </form>
    )
  }
}

const mapStateToProps = state => ({
  search: state.search
});

const mapDispatchToProps = {
  searchAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(UniversalSearchForm);

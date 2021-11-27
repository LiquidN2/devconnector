import React, { Component } from 'react';
import { ControlledTextInput } from './ControlledInput';
import { connect } from 'react-redux';

import { setCompanyFilter, setLocationFilter } from '../../actions/filterActions';

class SearchFilterForm extends Component {

  state = {
    location: '',
    company: ''
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  handleLocationChange = event => {
    this.props.setLocationFilter(event.target.value);
  }

  handleCompanyChange = event => {
    this.props.setCompanyFilter(event.target.value);
  }

  handleShowMoreFilters = event => {
    event.preventDefault();
    console.log('show more filter');
  };

  handleSubmit = () => {
    console.log('submit');
  };

  render() {
    return (
      <div className="filter-container">
        <form onSubmit={this.handleSubmit}>
          <div className="filter-box">

            <div className="form__group form__group--filter-item">
              <label 
                htmlFor="location" 
                className="form__label form__label--filter-item"
              >
                Location
              </label>
              <ControlledTextInput
                fieldName="location"
                fieldId="location"
                className="form__input"
                fieldValue={this.props.filters.location}
                onChange={this.handleLocationChange}
              />
            </div>

            <div className="form__group form__group--filter-item">
              <label 
                htmlFor="company" 
                className="form__label form__label--filter-item"
              >
                Company
              </label>
              <ControlledTextInput
                fieldName="company"
                fieldId="company"
                className="form__input"
                fieldValue={this.props.filters.company}
                onChange={this.handleCompanyChange}
              />
              {/* <select name="company" id="company" className="form__input">
                <option value="" className="form__input-option">-- select --</option>
                <option value="Company 1">Company 1</option>
                <option value="Company 2">Company 2</option>
                <option value="Company 3">Company 3</option>
              </select> */}
            </div>
          </div>
          <div className="filter-action-box">
            <button 
              className="btn btn--full btn--text-color-primary"
              onClick={this.handleShowMoreFilters}
            >
              + View More Filters
            </button>
            <button className="btn btn--full btn--color-primary">Update Search</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = {
  setCompanyFilter,
  setLocationFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilterForm);
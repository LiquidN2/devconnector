import React, { Component } from 'react';

import ResultItem from './ResultItem';

export default class Results extends Component {
  render() {
    return (
      <div className="u-margin-bottom-3rem">
        <div className="results-box">
          <div className="results-heading-container results-heading-container--with-separator u-padding-bottom-3rem">
            <h2 className="results-heading">People</h2>
            <span className="results-count">
              {
                this.props.results.length > 1 ? `${this.props.results.length} results` : `${this.props.results.length} result` 
              }
            </span>
          </div>
          <div className="result-item-container">
            {
              this.props.results.map(result => {
                return <ResultItem key={result._id} {...result} />
              })
            }

          </div>
        </div>

        <div className="result-action-box">
          <button className="btn btn--full btn--text-color-primary">View More</button>
        </div>
      </div>
    )
  }
}

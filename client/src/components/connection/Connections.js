import React, { Component } from 'react';

import ConnectionItem from './ConnectionItem';
import Loading from '../Loading';

export default class Connections extends Component {
  handleShowMoreConnections = event => {
    event.preventDefault();
    this.props.handleShowMoreConnections();
  }

  render() {
    return (
      <div className="row">
        <div className="connection-box">
          <div className="connection-heading-container">
            <h2 className="connection-heading u-margin-bottom-3rem">Connections</h2>
            <span className="connection-count">
              {
                this.props.numConnections > 1 ? (
                  `${this.props.numConnections} connections`
                ) : (
                  `${this.props.numConnections} connection`
                )
              }
            </span>
          </div>

          <div className="connection-text-separater"></div>

          <div className="connection-item-container">
            {
              this.props.connections.map(connection => {
                return (
                  <ConnectionItem 
                    key={connection._id} 
                    {...connection} 
                    handleRemoveConnection={this.props.handleRemoveConnection}
                  />
                
                )
              })
            }

            <div className="row u-display-flex-row-center">
              <button className="btn-link btn-link--color" onClick={this.handleShowMoreConnections}>
                <i className="fas fa-arrow-down"></i>&nbsp;
                Show more people
              </button>
            </div>

            {
              this.props.isFetchingConnections ? (
                <div className="container">
                  <Loading />
                </div>
              ) : null
            }
          </div>
        </div>
      </div>
    );
  }
};

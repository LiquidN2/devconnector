import React, { Component } from 'react';
import { connect } from 'react-redux';

import PendingRequestItem from './PendingRequestItem';
import Loading from '../Loading';

import { 
  getPendingRequestsAsync, 
  approveConnectionAsync,
  declineConnectionAsync 
} from './../../actions/connectionActions';

class PendingRequest extends Component {
  componentDidMount = () => {
    this.props.getPendingRequestsAsync();
    // if (!this.props.numPendingRequests) {
    //   this.props.getPendingRequestsAsync();
    // }
  };

  onApproveConnection = approvalData => {
    this.props.approveConnectionAsync(approvalData);
  };

  onDeclineConnection = declineData => {
    this.props.declineConnectionAsync(declineData);
    // console.log(declineData);
  };

  render() {
    if (this.props.isFetchingPendingRequest) {
      return (
        <div className="container u-margin-bottom-3rem">
          <Loading />
        </div>
      )
    } else if (this.props.numPendingRequests > 0) {
      return (
        <div className="row">
          <div className="connection-box">
            <div className="connection-heading-container connection-heading-container--with-separator u-padding-bottom-3rem">
              <h2 className="profile-heading">
                Pending Connection Requests
              </h2>
              <span className="connection-count">
                {
                  this.props.numPendingRequests > 1 ? (
                    `${this.props.numPendingRequests} requests`
                  ) : (
                    `${this.props.numPendingRequests} request`
                  )
                }
              </span>
            </div>

            <div className="connection-item-container">
              {
                this.props.pendingRequests.map(pendingRequestItem => {
                  return (
                    <PendingRequestItem 
                      key={pendingRequestItem._id} 
                      selfProfileId={this.props.selfProfileId}
                      {...pendingRequestItem}
                      onApproveConnection={this.onApproveConnection}
                      onDeclineConnection={this.onDeclineConnection}
                      isApprovingRequest={this.props.isApprovingRequest}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>

      );
    } else {
      return null;
    }
  }
};

const mapStateToProps = state => ({
  selfProfileId: state.profile.profile._id,
  isApprovingRequest: state.connections.isApprovingRequest,
  isFetchingPendingRequest: state.connections.isFetchingPendingRequest,
  numPendingRequests: state.connections.numPendingRequests,
  pendingRequests: state.connections.pendingRequests
});

const mapDispatchToProps = {
  getPendingRequestsAsync,
  approveConnectionAsync,
  declineConnectionAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingRequest)
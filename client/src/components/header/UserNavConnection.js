import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import setAuthToken from './../../utils/setAuthToken';

import { getNumPendingRequestsAsync } from './../../actions/connectionActions';

class UserNavConnection extends Component {
  componentDidMount = () => {
    setAuthToken(localStorage.getItem('token'));
    this.props.getNumPendingRequestsAsync();
  };
  
  render() {
    return (
      <div className="user-nav__icon-box">
        <Link to="/connections">
          <span className="user-nav__icon">
            <i className="far fa-user fa-lg"></i>
          </span>

          { 
            this.props.numPendingRequests > 0 ? (
              <span className="user-nav__notification">
                {this.props.numPendingRequests}
              </span>
            ) : null 
          }
          
        </Link>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  numPendingRequests: state.connections.numPendingRequests
});

const mapDispatchToProps = {
  getNumPendingRequestsAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(UserNavConnection);

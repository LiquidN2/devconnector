import React, { Component } from 'react';
import { connect } from 'react-redux';

import setAuthToken from './../utils/setAuthToken';

// load components
// import Loading from './Loading';
import Header from './header/Header';
import AvatarBox from './profile/AvatarBox';
import PendingRequest from './connection/PendingRequest';
import Connections from './connection/Connections';


// load actions
import { setCurrentUserAsync } from './../actions/userActions';
import { getCurrentUserProfileAsync } from './../actions/profileActions';
import { getCurrentUserPostCountAsync } from '../actions/postActions';
import { 
  getNumConnectionsAsync, 
  getConnectionsAsync,
  removeConnectionAsync 
} from './../actions/connectionActions';

class ConnectionPage extends Component {
  state = {
    pageNum: 1
  };

  componentDidMount = () => {
    setAuthToken(localStorage.getItem('token'));
    // get current user
    if (!this.props.user._id) {
      this.props.setCurrentUserAsync();
    }

    if (!this.props.profile._id) {
      this.props.getCurrentUserProfileAsync();
    }

    if (!this.props.numConnections) {
      this.props.getNumConnectionsAsync();
    }

    this.props.getConnectionsAsync(this.state.pageNum);

    this.props.getCurrentUserPostCountAsync();
  };

  handleShowMoreConnections = () => {
    this.setState(prevState => ({
      pageNum: prevState.pageNum + 1
    }), () => {
      this.props.getConnectionsAsync(this.state.pageNum);
    })
  };

  handleRemoveConnection = (userId, connectionId) => {
    this.props.removeConnectionAsync(userId, connectionId);
    // console.log('removing connection', connectionId);
    // console.log('removing user', userId);
  };

  render() {
    return (
      <React.Fragment>
        <Header /> 
        <section className="section-profile">
          <div className="container row">
            <div className="col-1-of-4">
              <div className="row">
                <AvatarBox
                  user={this.props.user}
                  profile={this.props.profile}
                  numConnections={this.props.numConnections}
                  numPosts={this.props.numPosts}
                />
              </div>
            </div>
            <div className="col-3-of-4">
              <PendingRequest />

              <Connections 
                isFetchingConnections={this.props.isFetchingConnections} 
                numConnections={this.props.numConnections} 
                connections={this.props.connections}
                handleShowMoreConnections={this.handleShowMoreConnections}
                handleRemoveConnection={this.handleRemoveConnection}
              />
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  profile: state.profile.profile,
  isFetchingConnections: state.connections.isFetchingConnections,
  numConnections: state.connections.numConnections,
  connections: state.connections.connections,
  numPosts: state.posts.numPosts
});

const mapDispatchToProps = {
  setCurrentUserAsync,
  getCurrentUserPostCountAsync,
  getNumConnectionsAsync,
  getConnectionsAsync,
  getCurrentUserProfileAsync,
  removeConnectionAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionPage);
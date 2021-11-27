import React, { Component } from 'react';
import { connect } from 'react-redux';

// load components
import Header from './header/Header';
import ProfileBase from './profile/ProfileBase';
import Loading from './Loading';
import ProfileMainForm from './form/ProfileMainForm';

import setAuthToken from './../utils/setAuthToken';

// load actions
import { setCurrentUserAsync } from './../actions/userActions';
import { getNumConnectionsAsync } from '../actions/connectionActions';
import {
  getCurrentUserProfileAsync,
  updateCurrentUserProfileAsync
} from './../actions/profileActions';

class ProfileEditPage extends Component {
  componentDidMount() {
    setAuthToken(localStorage.getItem('token'));

    // fetching current user
    if (!this.props.user._id) {
      this.props.setCurrentUserAsync();
    }

    // fetching current profile
    if (!this.props.profile._id) {
      this.props.getCurrentUserProfileAsync();
    }

    if (!this.props.numConnections) {
      this.props.getNumConnectionsAsync();
    }
  }

  onProfileMainUpdate = profileData => {
    this.props.updateCurrentUserProfileAsync(profileData);
  }

  render() {
    const { isFetchingUser, isFetchingProfile, isUpdatingProfile } = this.props;

    const profileBase = {
      user: this.props.user,
      _id: this.props.profile._id,
      githubUser: this.props.profile.githubUser,
      handle: this.props.profile.handle,
      website: this.props.profile.website,
      location: this.props.profile.location,
      company: this.props.profile.company,
      social: this.props.profile.social,
      status: this.props.profile.status
    };

    const { bio, skills } = this.props.profile;

    return (
      <React.Fragment>
        <Header path={this.props.match.path} />
        <section className="section-profile">
          {
            (isFetchingUser || isFetchingProfile) ? (
              <div className="container u-margin-bottom-3rem">
                <Loading />
              </div>
            ) : null
          }

          <div className="container row">
            <div className="col-1-of-4">
              <div className="row">
                {
                  this.props.user._id ? (
                    <ProfileBase
                      {...profileBase}
                      numConnections={this.props.numConnections}
                      numPosts={this.props.numPosts}
                    />
                  ) : null
                }
              </div>
            </div>

            <div className="col-3-of-4">
              {
                this.props.profile._id ? (
                  <ProfileMainForm
                    bio={bio}
                    skills={skills}
                    {...profileBase}
                    onProfileMainUpdate={this.onProfileMainUpdate}
                    isUpdatingProfile={isUpdatingProfile}
                    profileErrors={this.props.profileErrors}
                  />
                ) : (
                    <ProfileMainForm
                      onProfileMainUpdate={this.onProfileMainUpdate}
                    />
                  )
              }
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => ({
    isFetchingUser: state.user.isFetching,
    userErrors: state.errors.user,
    user: state.user.user,

    isFetchingProfile: state.profile.isFetching,
    isUpdatingProfile: state.profile.isUpdating,
    profileErrors: state.errors.profile,
    profile: state.profile.profile,

    numConnections: state.connections.numConnections,
    numPosts: state.posts.numPosts
});

const mapDispatchToProps = {
  getCurrentUserProfileAsync,
  updateCurrentUserProfileAsync,
  setCurrentUserAsync,
  getNumConnectionsAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPage);
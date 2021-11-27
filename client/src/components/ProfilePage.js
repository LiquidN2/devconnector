import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import setAuthToken from './../utils/setAuthToken';

// load components
import Header from './header/Header';
import ProfileBase from './profile/ProfileBase';
import ProfileSummary from './profile/ProfileSummary';
import ProfileExperience from './profile/ProfileExperience';
import ProfileEducation from './profile/ProfileEducation';
import ProfileSkills from './profile/ProfileSkills';
import Loading from './Loading';

// Load actions
import { setCurrentUserAsync } from './../actions/userActions';
import { getCurrentUserProfileAsync } from './../actions/profileActions';
import { getNumConnectionsAsync } from '../actions/connectionActions';
import { getCurrentUserPostCountAsync } from '../actions/postActions';

class ProfilePage extends Component {
  componentDidMount() {
    setAuthToken(localStorage.getItem('token'));
    // get current user
    if (!this.props.user._id) {
      this.props.setCurrentUserAsync();
    }

    // get current profile
    if (!this.props.profile._id) {
      this.props.getCurrentUserProfileAsync();
    }

    this.props.getNumConnectionsAsync();

    this.props.getCurrentUserPostCountAsync();
  }

  render() {
    const { isFetchingProfile } = this.props;

    const profileBase = {
      user: this.props.user,
      githubUser: this.props.profile.githubUser,
      handle: this.props.profile.handle,
      website: this.props.profile.website,
      location: this.props.profile.location,
      social: this.props.profile.social
    };

    const { bio, skills, experience, education } = this.props.profile;

    return (
      <React.Fragment>
        <Header />
        <section className="section-profile">

          {
            isFetchingProfile ? (
              <div className="container u-margin-bottom-3rem">
                <Loading />
              </div>
            ) : (
                null
              )
          }

          <div className="container row">
            <div className="col-1-of-4">
              {
                this.props.user._id ? (
                  <div className="row">
                    <ProfileBase 
                      {...profileBase} 
                      numConnections={this.props.numConnections}
                      numPosts={this.props.numPosts}
                    />
                  </div>
                ) : null
              }
              {
                this.props.profile._id ? (
                  <div className="row">
                    <Link 
                      to="/profile/edit" 
                      className="btn btn--color-primary btn--full u-center-text"
                    >
                      Edit Profile
                    </Link>
                  </div>
                ) : null
              }
            </div>

            {
              this.props.profile._id ? (
                <React.Fragment>
                  <div className="col-2-of-4">
                    <div className="row">
                      <ProfileSummary
                        boxTitle="Summary"
                        text={bio || ''}
                      />
                    </div>
                    <div className="row">
                      <ProfileExperience
                        boxTitle="Experience"
                        experiences={experience || []}
                      />
                    </div>
                    <div className="row">
                      <ProfileEducation
                        boxTitle="Education"
                        educations={education || []}
                      />
                    </div>
                  </div>

                  <div className="col-1-of-4">
                    <div className="row">
                      <ProfileSkills
                        boxTitle="Skills"
                        skills={skills || []}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ) : null
            }

            {
              (!isFetchingProfile && !this.props.profile._id) ? (
                <div className="col-3-of-4">
                  <p style={{ marginBottom: "1.5rem" }}>You don't have a profile yet.</p>
                  <Link to="/profile/create" className="link--color">Create Profile &rarr;</Link>
                </div>
              ) : null
            }

          </div>
        </section>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => ({
  isFetchingProfile: state.profile.isFetching,
  profile: state.profile.profile,
  user: state.user.user,
  numConnections: state.connections.numConnections,
  isFetchingPostCount: state.posts.isFetchingCount,
  numPosts: state.posts.numPosts
});

const mapDispatchToProps = { 
  setCurrentUserAsync, 
  getCurrentUserProfileAsync,
  getNumConnectionsAsync,
  getCurrentUserPostCountAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
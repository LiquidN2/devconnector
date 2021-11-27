import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

// load components
import Header from './header/Header';
import ProfileBase from './profile/ProfileBase';
import Loading from './Loading';
import ProfileExperience from './profile/ProfileExperience';
import ExperienceModalForm from './form/ExperienceModalForm';

import setAuthToken from './../utils/setAuthToken';

// load actions
import { setCurrentUserAsync } from './../actions/userActions';
import { getNumConnectionsAsync } from '../actions/connectionActions';
import {
  getCurrentUserProfileAsync,
  getCurrentUserExperiencesAsync,
  addNewExperienceAsync,
  updateExperienceAsync,
  deleteExperienceAsync
} from './../actions/profileActions';


// bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

class ExperienceEditPage extends Component {
  state = {
    modalIsOpen: false,
    currentExperience: {}
  };

  componentDidMount = () => {
    setAuthToken(localStorage.getItem('token'));

    // fetching current user
    if (!this.props.user._id) {
      this.props.setCurrentUserAsync();
    }

    if (!this.props.profile._id) {
      this.props.getCurrentUserProfileAsync();
    }

    if (!this.props.numConnections) {
      this.props.getNumConnectionsAsync();
    }
  };

  onExperienceUpdate = experienceData => {
    if (!experienceData._id) {
      // add new experience if exp id is not provided
      this.props.addNewExperienceAsync(experienceData);
    } else {
      // console.log(experienceData);
      this.props.updateExperienceAsync(experienceData);
    }
    this.props.getCurrentUserExperiencesAsync();
    this.closeModal();
  };

  onExperienceDelete = experienceId => {
    this.props.deleteExperienceAsync(experienceId);
    this.props.getCurrentUserExperiencesAsync();
  };

  onShowItemToEdit = experienceData => {
    // set current exp to state
    this.setState(() => {
      return {
        currentExperience: { ...experienceData }
      }
    });

    this.openModal();
  };

  onAddNewItem = () => {
    this.setState(() => {
      return {
        currentExperience: {}
      }
    });

    this.openModal();
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { isFetchingProfile, isUpdatingProfile } = this.props;

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

    const { experience } = this.props.profile;

    return (
      <React.Fragment>
        <Header path={this.props.match.path} />
        <section className="section-profile">
          {
            (isFetchingProfile || isUpdatingProfile) ? (
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
                    />
                  ) : null
                }
              </div>
            </div>

            <div className="col-3-of-4">
              <ProfileExperience
                boxTitle="Experience"
                withTools={true}
                experiences={experience || []}
                onAddNewItem={this.onAddNewItem}
                onShowItemToEdit={this.onShowItemToEdit}
                onExperienceDelete={this.onExperienceDelete}
              />
            </div>
          </div>
        </section>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          className="modal"
          overlayClassName="modal__overlay"
          contentLabel="Experience Form Modal"
        >
          <ExperienceModalForm
            {...this.state.currentExperience}
            onExperienceUpdate={this.onExperienceUpdate}
            closeModal={this.closeModal}
          />
        </Modal>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => ({
  user: state.user.user,
  isFetchingProfile: state.profile.isFetching,
  isUpdatingProfile: state.profile.isUpdating,
  profile: state.profile.profile,
  numConnections: state.connections.numConnections
});

const mapDispatchToProps = {
  setCurrentUserAsync,
  getCurrentUserProfileAsync,
  getCurrentUserExperiencesAsync,
  addNewExperienceAsync,
  updateExperienceAsync,
  deleteExperienceAsync,
  getNumConnectionsAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceEditPage);
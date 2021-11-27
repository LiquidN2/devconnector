import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

// load components
import Header from './header/Header';
import ProfileBase from './profile/ProfileBase';
import Loading from './Loading';
import ProfileEducation from './profile/ProfileEducation';
import EducationModalForm from './form/EducationModalForm';

import setAuthToken from './../utils/setAuthToken';

// load actions
import { setCurrentUserAsync } from './../actions/userActions';
import { getNumConnectionsAsync } from '../actions/connectionActions';
import {
  getCurrentUserProfileAsync,
  getCurrentUserEducationAsync,
  addNewEducationAsync,
  updateEducationAsync,
  deleteEducationAsync
} from './../actions/profileActions';


// bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

class EducationEditPage extends Component {
  state = {
    modalIsOpen: false,
    currentEducation: {}
  };

  componentDidMount = () => {
    setAuthToken(localStorage.getItem('token'));

    // fetching current user
    if (!this.props.user._id) {
      this.props.setCurrentUserAsync();
    }

    // fetching profile user
    if (!this.props.profile._id) {
      this.props.getCurrentUserProfileAsync();
    }

    if (!this.props.numConnections) {
      this.props.getNumConnectionsAsync();
    }
  };

  onEducationUpdate = educationData => {
    if (!educationData._id) {
      // add new
      // console.log('adding new', educationData);
      this.props.addNewEducationAsync(educationData);
    } else {
      // edit education
      // console.log('editting', educationData);
      this.props.updateEducationAsync(educationData);
    }

    this.props.getCurrentUserEducationAsync();
    this.closeModal();
  };

  onEducationDelete = educationId => {
    this.props.deleteEducationAsync(educationId);
    this.props.getCurrentUserEducationAsync();
  };

  onShowItemToEdit = educationData => {
    // set current exp to state
    this.setState(() => {
      return {
        currentEducation: { ...educationData }
      }
    });

    this.openModal();
  };

  onAddNewItem = () => {
    this.setState(() => {
      return {
        currentEducation: {}
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

    const { education } = this.props.profile;

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
              <ProfileEducation
                boxTitle="Education"
                withTools={true}
                educations={education || []}
                onAddNewItem={this.onAddNewItem}
                onShowItemToEdit={this.onShowItemToEdit}
                onEducationDelete={this.onEducationDelete}
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
          contentLabel="Education Form Modal"
        >
          <EducationModalForm
            {...this.state.currentEducation}
            onEducationUpdate={this.onEducationUpdate}
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
  getCurrentUserEducationAsync,
  addNewEducationAsync,
  updateEducationAsync,
  deleteEducationAsync,
  getNumConnectionsAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(EducationEditPage);
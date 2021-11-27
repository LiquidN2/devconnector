import React, { Component } from 'react';
import { ControlledTextInput, ControlledTextArea } from './ControlledInput';
import Loading from './../Loading';

export default class ProfileMainForm extends Component {
  state = {
    status: '',
    handle: '',
    company: '',
    location: '',
    githubUser: '',
    website: '',
    bio: '',
    linkedin: '',
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    skills: '',
  };

  // Set initial state from props when mounted
  componentDidMount = () => {
    this.setState(prevState => ({
      ...prevState,
      status: this.props.status ? this.props.status : '',
      handle: this.props.handle ? this.props.handle : '',
      company: this.props.company ? this.props.company : '',
      location: this.props.location ? this.props.location : '',
      githubUser: this.props.githubUser ? this.props.githubUser : '',
      website: this.props.website ? this.props.website : '',
      bio: this.props.bio ? this.props.bio : '',
      skills: this.props.skills ? this.props.skills.join(', ') : ''
    }));

    if (this.props.social) {
      this.setState(prevState => ({
        ...prevState,
        linkedin: this.props.social.linkedin ? this.props.social.linkedin : '',
        facebook: this.props.social.facebook ? this.props.social.facebook : '',
        twitter: this.props.social.twitter ? this.props.social.twitter : '',
        instagram: this.props.social.instagram ? this.props.social.instagram : '',
        youtube: this.props.social.youtube ? this.props.social.youtube : ''
      }))
    }
  }

  // Set initial state from props when updated
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.status && !prevProps.status) {
      this.setState({ status: this.props.status });
    }
    if (this.props.handle && !prevProps.handle) {
      this.setState({ handle: this.props.handle });
    }
    if (this.props.company && !prevProps.company) {
      this.setState({ company: this.props.company });
    }
    if (this.props.location && !prevProps.location) {
      this.setState({ location: this.props.location });
    }
    if (this.props.githubUser && !prevProps.githubUser) {
      this.setState({ githubUser: this.props.githubUser });
    }
    if (this.props.website && !prevProps.website) {
      this.setState({ website: this.props.website });
    }
    if (this.props.bio && !prevProps.bio) {
      this.setState({ bio: this.props.bio });
    }
    if (this.props.skills && !prevProps.skills) {
      this.setState({ skills: this.props.skills.join(', ') });
    }

    if (this.props.social && !prevProps.social) {
      if (this.props.social.linkedin) {
        this.setState({ linkedin: this.props.social.linkedin });
      }
      if (this.props.social.facebook) {
        this.setState({ facebook: this.props.social.facebook });
      }
      if (this.props.social.twitter) {
        this.setState({ twitter: this.props.social.twitter });
      }
      if (this.props.social.instagram) {
        this.setState({ instagram: this.props.social.instagram });
      }
      if (this.props.social.youtube) {
        this.setState({ youtube: this.props.social.youtube });
      }
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  onSubmit = event => {
    event.preventDefault();
    const {
      status,
      handle,
      company,
      location,
      githubUser,
      website,
      bio,
      linkedin,
      facebook,
      twitter,
      instagram,
      youtube,
      skills
    } = this.state;

    const updatedProfileData = {
      status,
      handle,
      company,
      location,
      githubUser,
      website,
      bio,
      linkedin,
      facebook,
      twitter,
      instagram,
      youtube,
      skills
    };

    this.props.onProfileMainUpdate(updatedProfileData);
  };

  onHandleClearForm = event => {
    event.preventDefault();
    this.setState({
      status: '',
      handle: '',
      company: '',
      location: '',
      githubUser: '',
      website: '',
      bio: '',

      linkedin: '',
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',

      skills: ''
    });
  };

  render() {
    const classNameBtn = 'btn btn--full';
    const classNameSaveBtn = this.props.isUpdatingProfile ? `${classNameBtn} btn--disabled` : `${classNameBtn} btn--color-primary`;
    const classNameResetBtn = this.props.isUpdatingProfile ? `${classNameBtn} btn--disabled` : classNameBtn;

    return (
      <div className="profile-edit">
        <h2 className="profile-heading u-margin-bottom-3rem">Update Your Profile</h2>
        <div className="profile-text-separater"></div>

        <form className="u-margin-top-3rem" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-1-of-2">
              <div className="form__group">
                <label htmlFor="status" className="form__label form__label--required">Status</label>
                <ControlledTextInput
                  fieldName="status"
                  fieldId="status"
                  className="form__input"
                  fieldValue={this.state.status}
                  onChange={this.handleInputChange}
                  required={true}
                />
              </div>
              <div className="form__group">
                <label htmlFor="handle" className="form__label form__label--required">Handle</label>
                <ControlledTextInput
                  fieldName="handle"
                  fieldId="handle"
                  className="form__input"
                  fieldValue={this.state.handle}
                  onChange={this.handleInputChange}
                  required={true}
                />
                { this.props.profileErrors ? <span className="form__input-error">{this.props.profileErrors.handle}</span> : null }
              </div>
              
            </div>
            <div className="col-1-of-2">
              <div className="form__group">
                <label htmlFor="location" className="form__label">Location</label>
                <ControlledTextInput
                  fieldName="location"
                  fieldId="location"
                  className="form__input"
                  fieldValue={this.state.location}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form__group">
                <label htmlFor="company" className="form__label">Company</label>
                <ControlledTextInput
                  fieldName="company"
                  fieldId="company"
                  className="form__input"
                  fieldValue={this.state.company}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-1-of-2">
              <div className="form__group">
                <label htmlFor="linkedin" className="form__label">LinkedIn</label>
                <ControlledTextInput
                  fieldName="linkedin"
                  fieldId="linkedin"
                  className="form__input"
                  fieldValue={this.state.linkedin}
                  onChange={this.handleInputChange}
                />
              </div>
              
              <div className="form__group">
                <label htmlFor="facebook" className="form__label">Facebook</label>
                <ControlledTextInput
                  fieldName="facebook"
                  fieldId="facebook"
                  className="form__input"
                  fieldValue={this.state.facebook}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form__group">
                <label htmlFor="instagram" className="form__label">Instagram</label>
                <ControlledTextInput
                  fieldName="instagram"
                  fieldId="instagram"
                  className="form__input"
                  fieldValue={this.state.instagram}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form__group">
                <label htmlFor="youtube" className="form__label">Youtube</label>
                <ControlledTextInput
                  fieldName="youtube"
                  fieldId="youtube"
                  className="form__input"
                  fieldValue={this.state.youtube}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="col-1-of-2">
              <div className="form__group">
                <label htmlFor="website" className="form__label">Website</label>
                <ControlledTextInput
                  fieldName="website"
                  fieldId="website"
                  className="form__input"
                  fieldValue={this.state.website}
                  onChange={this.handleInputChange}
                />
              </div>
            
              <div className="form__group">
                <label htmlFor="githubUser" className="form__label">Github User</label>
                <ControlledTextInput
                  fieldName="githubUser"
                  fieldId="githubUser"
                  className="form__input"
                  fieldValue={this.state.githubUser}
                  onChange={this.handleInputChange}
                />
              </div>
            
              <div className="form__group">
                <label htmlFor="twitter" className="form__label">Twitter</label>
                <ControlledTextInput
                  fieldName="twitter"
                  fieldId="twitter"
                  className="form__input"
                  fieldValue={this.state.twitter}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-full-width">
              <div className="form__group">
                <label htmlFor="skills" className="form__label form__label--required">Skills</label>
                <ControlledTextArea
                  fieldName="skills"
                  fieldId="skills"
                  className="form__input"
                  rows="3"
                  resize="vertical"
                  fieldValue={this.state.skills}
                  onChange={this.handleInputChange}
                  required={true}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-full-width">
              <div className="form__group">
                <label htmlFor="bio" className="form__label">Bio Summary</label>
                <ControlledTextArea
                  fieldName="bio"
                  fieldId="bio"
                  className="form__input"
                  rows="3"
                  resize="vertical"
                  fieldValue={this.state.bio}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>

          {this.props.isUpdatingProfile ? <div className="row"><Loading /></div> : null}

          <div className="row">
            <div className="col-1-of-4 col-offset-1-of-4">
              <button
                className={classNameSaveBtn}
                disabled={this.props.isUpdatingProfile}
              >
                Save
                            </button>
            </div>
            <div className="col-1-of-4">
              <button
                className={classNameResetBtn}
                onClick={this.onHandleClearForm}
                disabled={this.props.isUpdatingProfile}
              >
                Clear Form
                            </button>
            </div>
          </div>

        </form>
      </div>
    )
  }
}

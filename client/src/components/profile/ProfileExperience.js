import React, { Component } from 'react';

import ProfileBox from './ProfileBox';
import ProfileExperienceItem from './ProfileExperienceItem';

class ExperienceContent extends Component {
  render() {
    return (
      <div className="profile-experience__container u-margin-top-3rem">
        {
          this.props.experiences.map(experience => {
            return (
              <ProfileExperienceItem
                key={experience._id}
                {...experience}
                withTools={this.props.withTools}
                onShowItemToEdit={this.props.onShowItemToEdit}
                onExperienceDelete={this.props.onExperienceDelete}
              />
            )
          })
        }
      </div>
    )
  }
}

const ProfileExperience = ProfileBox(ExperienceContent);

export default ProfileExperience;
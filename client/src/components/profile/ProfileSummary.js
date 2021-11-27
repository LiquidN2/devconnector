import React from 'react';

import ProfileBox from './ProfileBox';

class SummaryContent extends React.Component {
  render() {
    return (
      <p className="profile-text u-margin-top-3rem">
        {this.props.text}
      </p>
    )
  }
}

const ProfileSummary = ProfileBox(SummaryContent);

export default ProfileSummary;
import React from 'react';

import ProfileBoxHeader from './ProfileBoxHeader';

const ProfileBox = ProfileBoxContentComponent => {
  return class extends React.Component {
    render() {
      const className = this.props.withTools ? 'profile-edit' : 'profile-box';

      return (
        <div className={className}>
          <ProfileBoxHeader
            boxTitle={this.props.boxTitle}
            withTools={this.props.withTools}
            onAddNewItem={this.props.onAddNewItem}
          />
          <ProfileBoxContentComponent {...this.props} />
        </div>
      );
    }
  }
};

export default ProfileBox;
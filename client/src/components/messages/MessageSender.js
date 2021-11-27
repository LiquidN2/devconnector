import React, { Component } from 'react';
import { connect } from 'react-redux';

// Load components
import SocialItem from '../profile/SocialItem';
import Loading from '../Loading';

// Load actions
import { getChatProfileAsync } from '../../actions/profileActions';

class MessageSender extends Component {

  componentDidUpdate = (prevProps, prevState) => {
    const { withUserId,chatProfile } = this.props;
    if(withUserId && prevProps.withUserId !== withUserId && !chatProfile[withUserId]) {
      this.props.getChatProfileAsync(withUserId);
    }
  }
    
  render() {
    const { withUserId, chatProfile } = this.props;
    
    if (chatProfile[withUserId]) {
      const { user, location, handle, website, social, githubUser } = chatProfile[withUserId];
      let email, linkedin, facebook, twitter, instagram, youtube;
      if (user) email = user.email;
      if (social) {
        linkedin = social.linkedin;
        facebook = social.facebook;
        twitter = social.twitter;
        instagram = social.instagram;
        youtube = social.youtube;
      }

      return (
        <div className="message-sender">
          {
            chatProfile.isFetching ? (
              <div className="container u-margin-top-3rem u-margin-bottom-3rem">
                <Loading />
              </div>
            ) : null
          }

          <div className="profile-base u-border-none">
          
            <div className="profile-base__photo-container">
              <img src={user.avatar} alt={user.name} className="profile-base__photo" />
              <p className="profile-base__text-name">{user.name}</p>
              <p className="profile-base__text-location">{location}</p>
            </div>
          
            <div className="profile-base__socials">
              {handle ? <SocialItem urlType="handle" urlValue={handle} /> : null}
              {githubUser ? <SocialItem urlType="github" urlValue={githubUser} /> : null}
              {email ? <SocialItem urlType="email" urlValue={email} /> : null}
              {website ? <SocialItem urlType="website" urlValue={website} /> : null}
              {linkedin ? <SocialItem urlType="linkedin" urlValue={linkedin} /> : null}
              {twitter ? <SocialItem urlType="twitter" urlValue={twitter} /> : null}
              {facebook ? <SocialItem urlType="facebook" urlValue={facebook} /> : null}
              {instagram ? <SocialItem urlType="instagram" urlValue={instagram} /> : null}
              {youtube ? <SocialItem urlType="youtube" urlValue={youtube} /> : null}
            </div>
          
          </div>
        </div>
      )
    } else {
      return <div className="message-sender">&nbsp;</div>;
    }

    
  }
}

const mapStateToProps = state => ({
  allRooms: state.room.all,
  chatProfile: state.chatProfile
});

const mapDispatchToProps = {
  getChatProfileAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageSender);
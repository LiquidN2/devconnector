import React, { Component } from 'react';

import SocialItem from './SocialItem';

export default class ProfileBase extends Component {
  render() {
    const { user, handle, website, location, social, githubUser, numConnections, numPosts } = this.props;
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
      <div className="profile-base">
        <div className="profile-base__photo-container">
          <img src={user.avatar} alt={user.name} className="profile-base__photo" />
          <p className="profile-base__text-name">{user.name}</p>
          <p className="profile-base__text-location">{location}</p>
        </div>

        {
          numConnections > 0 ? (
            <div className="profile-base__connections-posts">
              <div className="profile-base__connections-posts-box">
                <p className="profile-base__connections-posts-count">{numConnections}</p>
                <p className="profile-base__connections-posts-text">
                  {numConnections > 1 ? 'connections' : 'connection'}
                </p>
              </div>
              <div className="profile-base__connections-posts-box">
                <p className="profile-base__connections-posts-count">{numPosts}</p>
                <p className="profile-base__connections-posts-text">
                  {numPosts > 1 ? 'posts' : 'post'}
                </p>
              </div>
            </div>
          ) : null
        }

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
    )
  }
}

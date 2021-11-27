import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import SocialItem from './SocialItem';

export default class AvatarBox extends Component {
  render() {
    const { user, numConnections, numPosts } = this.props;
    const { location } = this.props.profile;

    return (
      <div className="profile-base">
        <div className="profile-base__photo-container">
          <img src={user.avatar} alt={user.name} className="profile-base__photo" />
          <p className="profile-base__text-name">{user.name}</p>
          <p className="profile-base__text-location">{location}</p>
        </div>

        {
          (numConnections > 0 || numPosts > 0) ? (
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

        <div className="profile-base__nav">
          <Link to={`/profile/user/${user._id}`} className="profile-base__nav-item link--color">View Profile</Link>
        </div>
      </div>
    )
  }
}

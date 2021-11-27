import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserNavMessenger extends Component {
  render() {
    return (
        <div className="user-nav__icon-box">
          <Link to="/messages">
            <span className="user-nav__icon">
              <i className="far fa-comments fa-lg"></i>
            </span>
          </Link>
          <span className="user-nav__notification">7</span>
        </div>
    )
  }
}

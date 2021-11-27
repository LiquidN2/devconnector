import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    let links = [];

    switch (this.props.path) {
      case '/profile/edit/education':
      case '/profile/edit/experience':
      case '/profile/edit':
        links = [{
          urlValue: '/profile/edit',
          urlLabel: 'Profile & Contact Info'
        }, {
          urlValue: '/profile/edit/experience',
          urlLabel: 'Experience'
        }, {
          urlValue: '/profile/edit/education',
          urlLabel: 'Education'
        }];
        break;
      
      case '/search':
        links = [{
          urlValue: '/search',
          urlLabel: 'All'
        }, {
          urlValue: '/search/people',
          urlLabel: 'People'
        }, {
          urlValue: '/search/company',
          urlLabel: 'Company'
        }];
        break;
      
      case '/messages/room/:roomId':
      case '/messages':
        links = [{
          urlValue: '/messages',
          urlLabel: 'All Messages'
        }, {
          urlValue: '/messages/unread',
          urlLabel: 'Unread Messages'
        }];
        break;

      default:
        links = [{
          urlValue: this.props.visitingUserId ? `/profile/user/${this.props.visitingUserId}` : '/profile',
          urlLabel: 'Profile'
        }, {
          urlValue: this.props.visitingUserId ? `/posts/user/${this.props.visitingUserId}` : '/posts',
          urlLabel: 'Posts'
        }, {
          urlValue: this.props.visitingUserId ? `/connections/user/${this.props.visitingUserId}` : '/connections',
          urlLabel: 'Connections'
        }];
    }

    return (
      <nav className="section-nav-bar">
        <div className="container nav-bar-container">
          <ul className="nav-bar">
            {
              links.map((link, index) => {
                return (
                  <NavLink 
                    exact 
                    key={index} 
                    to={link.urlValue} 
                    className="nav-bar__item" 
                    activeClassName="nav-bar__item--active"
                  >
                    <span className="nav-bar__link">{link.urlLabel}</span>
                  </NavLink>
                )
              })
            }
          </ul>
        </div>
      </nav>
    )
  }
}
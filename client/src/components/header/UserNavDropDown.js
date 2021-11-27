import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import onClickOutside from 'react-onclickoutside';

class UserNavDropDown extends Component {
  handleClickOutside = event => {
    event.preventDefault();
    this.props.handleClickOutside();
  };

  userLogout = () => {
    this.props.handleUserLogout();
  }

  render() {
    const { menuList } = this.props;

    return (
      <ul className="user-nav__dropdown user-nav__dropdown--show">
        <li className="user-nav__dropdown__arrow">
          <div className="arrow-up"></div>
        </li>

        {
          menuList.map((item, index) => {
            return (
              <Link key={index} to={item.url}>
                <li key={index} className="user-nav__dropdown__item">
                  <span className="user-nav__dropdown__link">{item.label}</span>
                </li>
              </Link>
            )
          })
        }

        <li className="user-nav__dropdown__item" onClick={this.userLogout}>
          <span className="user-nav__dropdown__link">Logout</span>
        </li>
      </ul>
    )
  }
}

export default onClickOutside(UserNavDropDown);
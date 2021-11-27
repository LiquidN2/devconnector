import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserNavDropDown from './UserNavDropDown';

import { userLogout } from './../../actions/authActions';

const menuList = [{
  url: '/profile',
  label: 'Profile'
}, {
  url: '/posts',
  label: 'Posts'
}, {
  url: '/connections',
  label: 'Connections'
}]

class UserNavProfile extends Component {
  state = {
    isUserMenuDropDown: false
  };

  onHandleUserMenuToggle = () => {
    this.setState(prevState => {
      return { isUserMenuDropDown: !prevState.isUserMenuDropDown };
    });
  };

  handleCloseUserMenu = () => {
    this.setState(prevState => {
      if (prevState.isUserMenuDropDown) {
        return { isUserMenuDropDown: false };
      }
    });
  };

  render() {
    return (
      <div className="user-nav__user">
        <img
          id="user-menu-btn"
          src={this.props.avatar}
          className="user-nav__user-photo"
          onClick={this.onHandleUserMenuToggle}
          alt={this.props.name}
        />

        {
          this.state.isUserMenuDropDown ? (
            <UserNavDropDown
              isOpen={this.state.isUserMenuDropDown}
              menuList={menuList}
              handleUserLogout={this.props.userLogout}
              handleClickOutside={this.handleCloseUserMenu}
            />
          ) : null
        }

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    avatar: state.user.user ? state.user.user.avatar : '',
    name: state.user.user ? state.user.user.name : ''
  }
};

const mapDispatchToProps = { userLogout };

export default connect(mapStateToProps, mapDispatchToProps)(UserNavProfile);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import onClickOutside from 'react-onclickoutside';

class ConnectionItemMenu extends Component {
  handleClickOutside = event => {
    // ..handling code goes here...
    // console.log('clicked outside connection menu');
    this.props.onClickOutside();
  };

  handleRemoveConnection = () => {
    const { userId, connectionId } = this.props;
    // console.log('removing connection', connectionId);
    // console.log('removing user', userId);
    this.props.handleRemoveConnection(userId, connectionId);
  };

  render() {
    return (
      <div className="connection-item__nav connection-item__nav--show">
        <div className="connection-item__nav-arrow">
          <div className="arrow-up"></div>
        </div>
        <Link to={`/chat/user/${this.props.userId}`} className="connection-item__nav-item link--color">Send Message</Link>
        <Link to={`/profile/user/${this.props.userId}`} className="connection-item__nav-item link--color">View Profile</Link>
        <button 
          className="connection-item__nav-item btn-menu-item btn-menu-item--color u-align-right-text"
          onClick={this.handleRemoveConnection}
        >
          Remove Connection
        </button>
      </div>
    )
  }
}

export default onClickOutside(ConnectionItemMenu);

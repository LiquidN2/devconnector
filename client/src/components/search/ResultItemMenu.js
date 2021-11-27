import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';

class ResultItemMenu extends Component {
  handleClickOutside = event => {
    // ..handling code goes here...
    // console.log('clicked outside connection menu');
    this.props.onClickOutside();
  };

  render() {
    return (
      <div className="result-item__nav result-item__nav--show">
        <div className="result-item__nav-arrow">
          <div className="arrow-up"></div>
        </div>
        <Link to={`/chat/user/${this.props.userId}`} className="connection-item__nav-item link--color">Send Message</Link>
        <Link to={`/profile/user/${this.props.userId}`} className="connection-item__nav-item link--color">View Profile</Link>
        {/* <button className="result-item__nav-item btn-menu-item btn-menu-item--color">
          Request Connection
        </button> */}
      </div>
    )
  }
}

export default onClickOutside(ResultItemMenu);
import React, { Component } from 'react';

import { socket } from '../../socketIOClient/socketIOClient';

import { NavLink } from 'react-router-dom';

export default class MessageHistoryItem extends Component {
  state = { isOnline: false }

  handleStatusUpdate = users => {
    const roomId = this.props._id;
    const userId = this.props.withUserId._id;

    const onlineUser = users.filter(user => {
      return user.id === userId && user.room === roomId;
    });

    if (onlineUser.length > 0) {
      this.setState({ isOnline: true });
    }
  };

  handleRemoveUser = user => {
    const userId = this.props.withUserId._id;
    if(user && user.id === userId) {
      this.setState({ isOnline: false });
    }
  }

  componentDidMount = () => {
    const roomId = this.props._id;
    const userId = this.props.user._id; //self user
    const userName = this.props.user.name; // self user
    socket.emit('join', {roomId, userId, userName});
    socket.on('updateUserList', this.handleStatusUpdate);
    socket.on('removeUser', this.handleRemoveUser);
  }

  componentWillUnmount = () => {
    // socket.removeListener('updateUserList', this.handleStatusUpdate);
    // socket.removeListener('removeUser', this.handleRemoveUser);
    socket.removeAllListeners();
  }
  
  render() {
    let itemClassName = "message-history-item";
    if (this.state.isOnline) {
      itemClassName = itemClassName + " message-history-item--online"
    }

    return (
      <NavLink
        to={`/messages/room/${this.props._id}`}
        className={itemClassName}
        activeClassName="message-history-item--active"
      >
        <img 
          src={this.props.withUserId.avatar} 
          alt={this.props.withUserId.name} 
          className="message-history-item__user-photo"
        />
        <div className="message-history-item__content">
          <p className="message-history-item__user-name">
            {this.props.withUserId.name}
          </p>
          <p className="message-history-item__text">Lorem ipsum dolor sit amet kosa...</p>
        </div>
      </NavLink>
    )
  }
}

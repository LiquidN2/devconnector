import React, { Component } from 'react';
import moment from 'moment';

export default class MessageIncomingItem extends Component {
  render() {
    return (
      <div className="message-conversation-incoming">
        <img src={this.props.user.avatar} alt={this.props.user.name} className="message-conversation-incoming__user-photo" />
        <div className="message-conversation-incoming__content">
          <p className="message-conversation-incoming__text">
            {this.props.text}
          </p>
          <p className="message-conversation-incoming__time">
            {moment(this.props.date).fromNow()}
          </p>
        </div>
      </div>
    )
  }
}

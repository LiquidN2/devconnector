import React, { Component } from 'react';
import moment from 'moment';

export default class MessageOutgoingItem extends Component {
  render() {
    return (
      <div className="message-conversation-outgoing">
          <div className="message-conversation-outgoing__content">
          <p className="message-conversation-outgoing__text">
            {this.props.text}
          </p>
          <p className="message-conversation-outgoing__time">
            {moment(this.props.date).fromNow()}
          </p>
        </div>
      </div>
    )
  }
}

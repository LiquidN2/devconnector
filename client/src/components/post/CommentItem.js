import React, { Component } from 'react';

import moment from 'moment';

export default class CommentItem extends Component {
  render() {
    return (
      <div className="post-comment__item">
        <img src={this.props.avatar} alt={this.props.name} className="post-comment__user-photo" />
        <div className="post-comment__content">
          <div className="post-comment__header">
            <span className="post-comment__user-name">{this.props.name}</span>
            <span className="post-time">{moment(this.props.date).fromNow()}</span>
          </div>
          <p className="post-comment__text">
            {this.props.text}
          </p>
        </div>
      </div>
    )
  }
}

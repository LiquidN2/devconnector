import React, { Component } from 'react';

import CommentItem from './CommentItem';
import CommentForm from './../form/CommentForm';

export default class Comments extends Component {
  render() {
    return (
      <div className="post-comment">
        {
          this.props.comments.map(comment => {
            return <CommentItem key={comment._id} {...comment} />
          })
        }
        <div className="post-comment__show-more">
          <button className="btn-link btn-link--color">
            <i className="fas fa-arrow-down"></i>&nbsp;
            Show more comments
          </button>
        </div>
        
        <CommentForm 
          postId={this.props.postId} 
          handleCreateComment={this.props.handleCreateComment} 
        />

      </div>
    )
  }
}

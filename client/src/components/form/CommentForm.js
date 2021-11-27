import React, { Component } from 'react';

import { ControlledTextArea } from './ControlledInput';

export default class CommentForm extends Component {
  state = { commentText: '' };
  
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  onSubmit = event => {
    event.preventDefault();

    const { postId } = this.props;
    const { commentText } = this.state;

    this.props.handleCreateComment(postId, commentText);
  };

  render() {
    return (
      <form className="post-comment__form" onSubmit={this.onSubmit}>
        <ControlledTextArea 
          className="post-comment__textarea"
          fieldId="commentText"
          fieldName="commentText"
          fieldValue={this.state.commentText}
          onChange={this.handleInputChange}
          placeholder="Post your comment here"
        />
        <button className="btn btn--small btn--color-primary">Add Comment</button>
      </form>
    )
  }
}

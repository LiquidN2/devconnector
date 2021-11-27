import React, { Component } from 'react'

export default class PreviewPhoto extends Component {
  handleRemovePreview = event => {
    event.preventDefault();
    this.props.handleRemovePreview();
  };

  render() {
    return (
      <div className="post-form__preview">
        <img
          id="post-photo-preview"
          src={this.props.file}
          className="post-form__preview-photo"
          alt="file preview"
        />
        <button 
          className="post-form__preview-delete" 
          onClick={this.handleRemovePreview}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    )
  }
}

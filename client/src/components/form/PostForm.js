import React, { Component } from 'react';

import { ControlledTextArea } from './ControlledInput';
import PreviewPhoto from './PreviewPhoto';

// export default class PostForm extends Component {
//   state = { post: '' };

//   handleInputChange = event => {
//     const target = event.target;
//     const value = target.type === 'checkbox' ? target.checked : target.value;
//     const name = target.name;

//     this.setState(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   onSubmit = event => {
//     event.preventDefault();
//     const { post } = this.state;
//     this.props.handleCreatePost(post);
//     this.setState(() => ({
//       post: ''
//     }));
//   };

//   render() {
//     return (
//       <form className="post-form" onSubmit={this.onSubmit}>
//         <ControlledTextArea
//           className="post-form__textarea"
//           fieldId="post"
//           fieldName="post"
//           fieldValue={this.state.post}
//           onChange={this.handleInputChange}
//           placeholder="What's on your mind?"
//           autoFocus
//         />

//         {
//           this.props.postErrors ? (
//             <span 
//               className="form__input-error" 
//               style={{marginBottom: "1rem"}}
//             >
//               {this.props.postErrors.text}
//             </span>
//           ) : null
//         }

//         <button className="btn btn--small btn--color-primary">Post</button>
//       </form>
//     );
//   }
// }


export default class PostForm extends Component {
  state = {
    post: '',
    file: null,
    fileBlob: null,
    fileName: ''
  };

  fileInputRef = element => {
    this.fileInputElement = element
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.file !== null && this.state.file === null) {
      this.fileInputElement.value = null;
    }
  };
  
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  handleFileChange = event => {
    const { files } = event.target;

    if (files && files.length > 0) {
      this.setState(prevState => ({
        file: URL.createObjectURL(files[0]),
        fileBlob: files[0],
        fileName: files[0].name
      }));
    }
  };

  handleRemovePreview = event => {
    this.setState(() => ({
      file: null,
      fileBlob: null,
      fileName: ''
    }));
  };

  onSubmit = event => {
    event.preventDefault();
    const { post: postText, file, fileBlob, fileName } = this.state;

    if (!file) {
      this.props.handleCreatePost(postText);
      this.setState(() => ({
        post: ''
      }));
    } else {
      this.props.handleCreatePostWithFile(fileBlob, fileName, postText);
      this.setState(() => ({
        post: '',
        file: null,
        fileBlob: null,
        fileName: ''
      }));
    }
  };

  render() {
    return (
      <form className="post-form" onSubmit={this.onSubmit}>
        <div className="post-form-tab">
          <label className="post-form-tab__btn post-form-tab__btn--active" htmlFor="post">
            <span className="post-form-tab__icon"><i className="fas fa-pen"></i></span>
            <span className="post-form-tab__text">Share an update</span>
          </label>
          <label className="post-form-tab__btn" htmlFor="file-upload">
            <span className="post-form-tab__icon"><i className="fas fa-camera"></i></span>
            <span className="post-form-tab__text">Upload a photo</span>
          </label>
        </div>

        <ControlledTextArea
          className="post-form__textarea"
          fieldId="post"
          fieldName="post"
          fieldValue={this.state.post}
          onChange={this.handleInputChange}
          isDisabled={this.props.isUploadingFile}
          placeholder="What's on your mind?"
          autoFocus
        />

        <input
          id="file-upload"
          type="file"
          name="file"
          className="post-form__input-file"
          onChange={this.handleFileChange}
          ref={this.fileInputRef}
          disabled={this.props.isUploadingFile || this.props.isUpdatingPosts}
        />

        {
          this.state.file ? (
            <PreviewPhoto 
              file={this.state.file}
              handleRemovePreview={this.handleRemovePreview}
            />
          ) : null
        }

        {
          this.props.postErrors ? (
            <span
              className="form__input-error"
              style={{ marginBottom: "1rem" }}
            >
              {this.props.postErrors.text}
            </span>
          ) : null
        }

        <button 
          className="btn btn--small btn--color-primary"
          disabled={this.props.isUploadingFile || this.props.isUpdatingPosts}
        >
          Post
        </button>
      </form>
    );
  }
}

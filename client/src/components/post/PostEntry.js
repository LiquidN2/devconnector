import React, { Component } from 'react';

import PostForm from './../form/PostForm';

// export default class PostEntry extends Component {
//   render() {
//     return (
//       <div className="post-form-box">
//         <div className="post-form-tab">
//           <NavLink to="/posts" className="post-form-tab__item" activeClassName="post-form-tab__item--active">
//             <span className="post-form-tab__icon"><i className="fas fa-pen"></i></span>
//             <span className="post-form-tab__text">Share an update</span>
//           </NavLink>
//           <a href="/" className="post-form-tab__item">
//             <span className="post-form-tab__icon"><i className="fas fa-camera"></i></span>
//             <span className="post-form-tab__text">Upload a photo</span>
//           </a>
//         </div>
//         <PostForm handleCreatePost={this.props.handleCreatePost} postErrors={this.props.postErrors}/>
//       </div>
//     );
//   }
// }


export default class PostEntry extends Component {
  render() {
    return (
      <div className="post-form-box">
        <PostForm 
          handleCreatePost={this.props.handleCreatePost} 
          handleFileUpload={this.props.handleFileUpload}
          handleCreatePostWithFile={this.props.handleCreatePostWithFile}
          postErrors={this.props.postErrors}
        />
      </div>
    );
  }
}

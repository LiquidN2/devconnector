import React, { Component } from 'react'

export default class ProfileBoxHeader extends Component {
  onHandleAddItem = event => {
    this.props.onAddNewItem();
  }

  render() {
    if (this.props.withTools) {
      return (
        <div className="profile-heading-wrapper profile-heading-wrapper--with-separator u-padding-bottom-3rem">
          <h2 className="profile-heading">
            Update {this.props.boxTitle}
          </h2>

          <button
            id="btn-add-experience"
            className="profile-edit__icon btn-icon"
            onClick={this.onHandleAddItem}
          >
            <i className="fas fa-plus fa-lg"></i>
          </button>
        </div>
      )
    } else {
      return (
        <h2 className="profile-heading profile-heading--with-separator u-padding-bottom-3rem">
          {this.props.boxTitle}
        </h2>
      )
    }

  }
}

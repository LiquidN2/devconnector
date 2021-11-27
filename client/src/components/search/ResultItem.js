import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ResultItemMenu from './ResultItemMenu';

export default class ResultItem extends Component {
  state = {
    showMenu: false
  };

  handleToggleMenu = event => {
    event.preventDefault();
    this.setState(prevState => ({
      showMenu: !prevState.showMenu
    }));
  };

  handleClickOutside = () => {
    this.setState(prevState => ({
      showMenu: false
    }))
  };

  render() {

    return (
      <div className="result-item">
        <Link to={`/profile/user/${this.props.user._id}`}>
          <img 
            src={this.props.user.avatar} 
            alt={this.props.user.name} 
            className="result-item__user-photo" 
          />
        </Link>
        
        <div className="result-item__main-content">
          <div className="result-item__description">
            <Link to={`/profile/user/${this.props.user._id}`}>
              <p className="result-item__user-name">{this.props.user.name}</p>
            </Link>
            <p className="result-item__user-text result-item__user-text--color">
              {
                this.props.company ? (
                  `${this.props.status} at ${this.props.company}`
                ) : (
                  this.props.status
                )
              }
            </p>
            <p className="result-item__user-text">{this.props.location}</p>
          </div>
          <div className="result-item__menu">
            <button 
              className="btn btn--small result-item__button"
              onClick={this.handleToggleMenu}
            >
              <i className="fas fa-ellipsis-h"></i>
            </button>
            {
              this.state.showMenu ? (
                <ResultItemMenu 
                  userId={this.props.user._id}
                  handleClickOutside={this.handleClickOutside}
                />
              ) : null
            }
          </div>
        </div>
      </div>
    )
  }
}

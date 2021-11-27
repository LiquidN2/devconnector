import React, { Component } from 'react';

export default class MessageSearchForm extends Component {
  render() {
    return (
      <form className="message-search">
        <button className="message-search__button">
          <span className="message-search__icon">
            <i className="fas fa-search"></i>
          </span>
        </button>
        <input type="text" name="message-search" id="message-search" className="message-search__input" placeholder="search messages" />
      </form>
    )
  }
}

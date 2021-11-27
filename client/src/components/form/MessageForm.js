import React, { Component } from 'react';
import { connect } from 'react-redux';

import { socket } from '../../socketIOClient/socketIOClient';

import { ControlledTextInput } from './ControlledInput';

import { addOwnUnsavedMessage } from '../../actions/messageActions';

class MessageForm extends Component {
  state = { message: '' };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));

    const { user, roomId } = this.props;
    socket.emit('userIsTyping', { user, roomId });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // console.log(this.state.message);
    const { message } = this.state; 
    const { user, roomId } = this.props; 

    const newMessage = {
      user,
      roomId, 
      text: message
    }

    socket.emit('newClientMessage', newMessage);

    this.props.addOwnUnsavedMessage(newMessage);

    this.setState({
      message: ''
    });
  };

  render() {
    const isDisabled = this.props.isFetchingUser || this.props.isSavingMessages;

    return (
      <form className="message-conversation-form" onSubmit={this.handleFormSubmit} >
        <button className="message-conversation-form__button">
          <span className="message-conversation-form__icon">
            <i className="far fa-file-image fa-lg"></i>
          </span>
        </button>

        <ControlledTextInput
          fieldName="message"
          fieldId="message"
          className="message-conversation-form__input"
          fieldValue={this.state.message}
          onChange={this.handleInputChange}
          required={true}
          isDisabled={isDisabled}
          autoFocus={true}
          placeholder="Send a message..."
        />
      </form>
    )
  }
}

const mapStateToProps = state => ({
  isFetchingUser: state.user.isFetching,
  user: state.user.user
});

const mapDispatchToProps = { addOwnUnsavedMessage }

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
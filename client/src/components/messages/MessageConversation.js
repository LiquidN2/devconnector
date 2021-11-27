import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import { socket } from '../../socketIOClient/socketIOClient';

import MessageForm from '../form/MessageForm';
import MessageIncomingItem from './MessageIncomingItem';
import MessageOutGoingItem from './MessageOutgoingItem';

import { 
  getMessagesByRoomIdAsync,
  addNewMessage,
  saveMessagesAsync 
} from '../../actions/messageActions';

import Loading from '../Loading';

class MessageConversation extends Component {
  state = { userIsTyping: false };
  
  // handle new message emitted from socket.io server
  handleNewServerMessage = message => {
    this.props.addNewMessage(message);
  };

  // scroll to the latest message at the bottom
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount = () => {
    const { roomId, message } = this.props;

    // fetch messages from DB
    if(!message[roomId] || message[roomId].length === 0){
      this.props.getMessagesByRoomIdAsync(roomId);
    }

    // listen to event from server
    socket.on('newServerMessage', this.handleNewServerMessage);

    socket.on('userIsTyping', room => {
      // console.log('user is typing');
      if (room === roomId && !this.state.userIsTyping) {
        this.setState({userIsTyping: true}, () => {
          setTimeout(() => {
            this.setState({ userIsTyping: false });
          }, 2000);
        });
      }
    });


    this.scrollToBottom();
  };
  
  componentDidUpdate = (prevProps, prevState) => {
    this.scrollToBottom();
  }
  
  componentWillUnmount = () => {
    socket.removeListener('newServerMessage', this.handleNewServerMessage);
  }
    
  render() {
    const { roomId, message, user } = this.props;
    const displayedMessages = message[roomId] ? message[roomId] : [];

    return (
      <div className="message-conversation">
        {
          message.isFetching ? (
            <div className="container u-margin-top-3rem u-margin-bottom-3rem">
              <Loading />
            </div>
          ) : null
        }
        { this.state.userIsTyping ? 'typing...' : null }
        <div className="message-conversation-incoming-outgoing">
          {
            displayedMessages.map((message, index) => {
              if(message.user._id === user._id) {
                return <MessageOutGoingItem key={index} {...message}/>
              } else {
                return <MessageIncomingItem key={index} {...message}/>
              }
              
            })
          }
          
          <div 
            style={{ float:"left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}
          >
          </div>
        </div>

        <MessageForm roomId={roomId} isSavingMessages={this.props.isSavingMessages} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  message: state.message
});

const mapDispatchToProps = {
  getMessagesByRoomIdAsync,
  addNewMessage,
  saveMessagesAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageConversation)
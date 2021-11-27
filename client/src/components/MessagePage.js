import React, { Component } from 'react';
import { connect } from 'react-redux';

import setAuthToken from './../utils/setAuthToken';

// load components
import Header from './header/Header';
// import ProfileBase from './profile/ProfileBase';
import MessageHistory from './messages/MessageHistory';
import MessageConversation from './messages/MessageConversation';
import MessageSender from './messages/MessageSender';

// Load actions
import { setCurrentUserAsync } from './../actions/userActions';
// import { getCurrentUserProfileAsync } from './../actions/profileActions';
import { getRoomsAsync, saveMessagesAsync } from '../actions/messageActions';


class MessagePage extends Component {

  state = { withUserId: null };
  
  componentDidMount = () => {
    console.log('mount the main page');
    
    setAuthToken(localStorage.getItem('token'));
    // get current user
    if (!this.props.user._id) {
      this.props.setCurrentUserAsync();
    }

    // get all rooms
    if (this.props.room.all.length === 0) {
      this.props.getRoomsAsync('oneonone', undefined);
    }
    
    // save messages to DB every 5s
    setInterval(() => {
      const { unsaved, isSaving } = this.props.message;
      if(unsaved.length > 0 && !isSaving) {
        this.props.saveMessagesAsync(unsaved);
      }
    }, 5000);

    if(this.props.match.params.roomId) {
      const { roomId } = this.props.match.params;
      const withUserId = this.getWithUserId(roomId);
      this.setState({ withUserId });
      // console.log('now in room', roomId, 'chating with', this.getWithUserId(roomId));
      
    }
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   if(this.props.room.all.length > 0 && this.props.match.params.roomId) {
  //     const { roomId } = this.props.match.params;
  //     console.log('now in room', roomId, 'chating with', this.getWithUserId(roomId));
  //   }
  // }
  

  getWithUserId = (roomId) => {
    const currentRoomInfo = this.props.room.all.find(room => {
      return room._id === roomId;
    });

    if (currentRoomInfo) {
      const withUserId = currentRoomInfo.withUserId._id;
      return withUserId;
    }
  }

  
  render() {
    return (
      <React.Fragment>
        <Header path={this.props.match.path}/>
        <section className="section-messages">
          <div className="container row">
            <div className="message-container u-margin-top-3rem">
              <MessageHistory 
                user={this.props.user}
                room={this.props.room} // all rooms
              />
              <MessageConversation
                user={this.props.user} 
                roomId={this.props.match.params.roomId} // selected room
                isSavingMessages={this.props.message.isSaving}
              />
              <MessageSender 
                user={this.props.user}
                roomId={this.props.match.params.roomId} // selected room
                withUserId={this.state.withUserId}
              />

              {/* <ProfileBase /> */}
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user.user,
  room: state.room,
  message: state.message
});

const mapDispatchToProps = {
  setCurrentUserAsync,
  getRoomsAsync,
  saveMessagesAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage)
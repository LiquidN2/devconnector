const { removeDuplicatedChatUser } = require('./removeDuplicates');

class ChatUser {
  constructor() {
    this.users = [];
  }

  addUser(socketId, id, name, room) {
    const newUser = {
      socketId,
      id: id ? id.toString() : '',
      name: name ? name.toString() : '',
      room: room ? room.toString() : ''
    };
    
    this.users.push(newUser);
  }

  getUser(socketId) {
    return this.users.filter(user => user.socketId === socketId)[0];
  }

  removeDuplicates() {
    let uniqueUsers = [];
    if (this.users.length > 0) {
      uniqueUsers = removeDuplicatedChatUser(this.users);
    }

    this.users = uniqueUsers;
  }

  
  getUserList(room) {
    let userList = [];
    if(!room) {
      userList = this.users;
    } else {
      userList = this.users.filter(user => {
        return user.room === room;
      });
    }
    return userList;
  }
  
  isOnline(room, id) {
    const existingUser = this.users.filter(user => {
      return user.id === id && user.room === room;
    })

    return existingUser.length;
  }

  removeOffline(socketId) {
    const userToRemove = this.getUser(socketId);

    if (userToRemove) {
      this.users = this.users.filter(user => {
        return user.socketId !== socketId;
      });

      return userToRemove;
    }
  
  };
  
}

module.exports = ChatUser;
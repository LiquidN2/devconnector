const ChatUser = require('../utils/ChatUsers');
const chatUsers = new ChatUser();

const socketIOController = (socket, io) => {

  socket.on('join', ({roomId, userId, userName}) => {

    if(userId && roomId) {
      chatUsers.addUser(socket.id, userId, userName, roomId);
      chatUsers.removeDuplicates();
    }

    socket.join(roomId);
        
    io.emit('updateUserList', chatUsers.getUserList());

  });

  socket.on('newClientMessage', message => {
    io.to(message.roomId).emit('newServerMessage', message);
  });

  socket.on('userIsTyping', ({user, roomId}) => {
    // console.log(`user ${user._id} is typing in room ${roomId}`);
    socket.broadcast.to(roomId).emit('userIsTyping', roomId);
  });

  // when client disconnect with chat server 
  socket.on('disconnect', () => {
    const removedUser = chatUsers.removeOffline(socket.id);
    io.emit('removeUser', removedUser);
  });
};

module.exports = socketIOController;
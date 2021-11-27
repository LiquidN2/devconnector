import io from "socket.io-client";

export const socket = io('/');

export const connectionNotify = callback => {
  socket.on('connect', callback);
};
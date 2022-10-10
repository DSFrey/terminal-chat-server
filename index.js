'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3002;
const { Server } = require('socket.io');
let server = new Server(PORT);

server.on('connection', (socket) => {
  console.log(`Socket connected`, socket.id);

  socket.on('JOIN', (room) => {
    socket.join(room);
  });

  socket.on('NEW_ROOM', (payload) => {
    socket.leave(payload.prevRoom);
    console.log(`Leaving ${payload.prevRoom}`);
    socket.join(payload.currentRoom);
    console.log(`Joining ${payload.currentRoom}`);
  });

  socket.on('MESSAGE', (message) => {
    console.log(message);
    socket.to(message.room).emit('MESSAGE', message);
  });
});

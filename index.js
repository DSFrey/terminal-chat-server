'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3002;
const { Server } = require('socket.io');
let server = new Server(PORT);

server.on('connection', (socket) => {
  console.log(`Socket connected`, socket);

  socket.on('JOIN', (room) => {
    socket.join(room);
    socket.on('MESSAGE', (message) => {
      console.log(message);
      socket.to(room).emit('MESSAGE','Message received');
    });

  });
});

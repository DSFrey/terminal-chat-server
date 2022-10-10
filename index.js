'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3002;
const { Server } = require('socket.io');
const Queue = require('./queue');
let server = new Server(PORT);
const roomQueues = new Queue();
roomQueues.store('lobby', new Queue());

server.on('connection', (socket) => {
  console.log(`Socket connected`, socket.id);

  socket.on('JOIN', (room) => {
    console.log(`Joined initial lobby room ${room}`);
    socket.join(room);
  });

  socket.on('NEW_ROOM', (payload) => {
    socket.leave(payload.prevRoom);
    console.log(`Leaving room ${payload.prevRoom}`);
    socket.join(payload.currentRoom);
    console.log(`Joining room ${payload.currentRoom}`);
  });

  socket.on('MESSAGE', (message) => {
    let currentRoomQueue = roomQueues.read(message.room);
    if (!currentRoomQueue) {
      const queueKey = roomQueues.store(message.room, new Queue());
      currentRoomQueue = roomQueues.read(queueKey);
    }
    currentRoomQueue.store(message.id, message);
    console.log('currentRoomQueue for ', message.author, 'is:', currentRoomQueue);
    socket.to(message.room).emit('MESSAGE', message);
    console.log(`${message.timeStamp}> From ${message.author} to ${message.room} room: ${message.text}`);
  });

  socket.on('RECEIVED', (message) => {
    const currentRoomQueue = roomQueues.read(message.room);
    if (!currentRoomQueue) {
      console.log(`A queue for the room ${message.room} was not created`);
      return;
    }
    const receivedMessage = currentRoomQueue.remove(message.id);
    console.log(`${message.author} confirms receipt of message: ${receivedMessage.text}`);
  });

  socket.on('GET_ALL', (room) => {
    console.log(`Getting all messages for ${room}`);
    const currentUserQueue = roomQueues.read(room);
    if (currentUserQueue && currentUserQueue.data) {
      Object.keys(currentUserQueue.data).forEach(id => {
        socket.emit('MESSAGE', currentUserQueue.read(id));
        console.log('Queued message sent', {id, message: currentUserQueue[id]});
      });
    }
  });
});

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*", // Allow Android to connect
  }
});


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('send-message', (msg) => {
    console.log('Message:', msg);
    socket.broadcast.emit('receive-message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

let counter = 5;

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('increment', () => {
    counter += 1;
    io.emit('incremented', counter);
    console.log(`Counter incremented: ${counter}`);
  });

  socket.on('reset', () => {
    counter = 0;
    io.emit('reset', counter);
    console.log(`Reseted Counter: ${counter}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// ✅ Use Render-assigned port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});


const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Communication = require('../models/communicationSchema'); 
const Chat_Controller = require('./controllers/ChatController');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const communicationModel = new Communication();
const chatController = new Chat_Controller(communicationModel);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    chatController.addMessage(msg);
    io.emit('chat message', chatController.getMessages());
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

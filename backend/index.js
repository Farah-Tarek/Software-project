const express = require('express');
const mongoose = require('mongoose');
const socketIO = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require('node-cron');
const { performBackupAndRestore } = require('./backup');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

require("./database");

// Import Routes
const userRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/ticketRoutes');
const recoveryRoutes = require('./routes/recoveryRoutes');
const workflowRoutes = require('./routes/workflowRoute');
const messageRoutes = require('./routes/messageRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

app.use("/api/", messageRoutes);
app.use("/api/", conversationRoutes);
app.use('/recovery', recoveryRoutes);
app.use('/api/users/', userRoutes);
app.use('/api/workflow/', workflowRoutes);
app.use('/api/tickets', ticketRoutes);

// Socket.io
const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});

const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = [];

io.on('connection', socket => {
  console.log('User connected', socket.id);

  socket.on('addUser', userId => {
    const isUserExist = users.find(user => user.userId === userId);
    if (!isUserExist) {
      const user = { userId, socketId: socket.id };
      users.push(user);
      io.emit('getUsers', users);
    }
  });

  socket.on('disconnect', () => {
    users = users.filter(user => user.socketId !== socket.id);
    io.emit('getUsers', users);
  });
  socket.on('sendMessage',(data)=>{
    console.log(
      'Send Message', data
    )
  })
});

// Schedule the backup and restore operation
cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Starting backup and restore process...');
    await performBackupAndRestore();
    console.log('Backup and restore completed successfully.');
  } catch (error) {
    console.error('Error during backup and restore:', error);
  }
});

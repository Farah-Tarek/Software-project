const express = require('express');
const cookieParser=require('cookie-parser');
const mongoose = require('mongoose');
const socket = require("socket.io");
require("dotenv").config();
const authenticationMiddleware = require("./Middleware/authenticationMiddleware.js");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const userRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/ticketRoutes');
const recoveryRoutes = require('./routes/recoveryRoutes');
const Workflow = require('./routes/workflowRoute');
const messageRoutes = require('./routes/MessageRoute');
const chatRoute = require('./routes/ChatRoute');
const baseRoutes = require('./routes/KBR');
const agentRoutes = require('./routes/agentRoutes');  
const userSchema = require('./models/userSchema');
app.use(cors({
  origin: 'http://localhost:5173'
  , withCredentials: true  // Replace with the URL of your frontend
}));
// Set the base URL for all Axios requests
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);


app.use('/api/users/', userRoutes);
app.use(authenticationMiddleware);
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoute);


require("./database");

app.use('/recovery', recoveryRoutes);
app.use('/api/workflow/', Workflow);
app.use('/api/tickets', ticketRoutes);
app.use('/api/base', baseRoutes);

// Import the performBackupAndRestore function
const { performBackupAndRestore } = require('./backup');


// Schedule the backup and restore operation
// Replace the existing import statement

// Schedule the backup and restore operation
 

// The rest of your code remains unchanged

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});




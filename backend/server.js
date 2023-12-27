const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./config/database')

const app = express()
const port = 3000
connectDB()
app.use(cors)
app.use(express.json())

// Socketio must be declared before api routes
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  transports: ['polling'],
  cors: { origin: allowedOrigins },
})
require('./socketio.js')(io)

// API routes
app.use('/users', require('./routes/auth'))
app.use('/notifications', require('./routes/notificationRoutes'))
app.all('*', require('./routes/404'))

// Connecting to MongoDB using mongoose
mongoose.connection.once('open', () => {
  server.listen(port, () => {
    console.log('🔗 Successfully Connected to MongoDB')
    console.log(`✅ Application running on port: ${port}`);
  })
})
mongoose.connection.on('error', (err) => {
  console.log(err) 
})
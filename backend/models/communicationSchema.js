const mongoose = require('mongoose');

// Defining ObjectId
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

// a schema for the format of a message 
const MessageSchema = new Schema({

  senderId: ObjectId, // either for user or agent
  receiverId: ObjectId, //either for user or agent

  messages: {
    type: String,
    required: true
  },


  timestamp: { 
    type: Date,
    required: true
  
  },

});



const communicationSchema = new Schema({
  Customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user_model',
      required: true,
      select: 'userid'
  },

  Agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'agent_model',
      required: true,
      select: 'agentid'
  },

  Ticketid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
      select: 'Ticketid'
  },

  email: {
      type: String,
      required: true
    },

  notification: {
      type: String,
      required: true
    },

  messages: {
      type: [MessageSchema],
      required: true
    },

timeStamp:{
  type: Date,
  required: true

},


})


const communication = mongoose.model('communication', communicationSchema);
module.exports = communication;
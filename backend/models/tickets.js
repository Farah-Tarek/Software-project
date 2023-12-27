const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const User = require('../models/userSchema'); // Make sure the path is correct


const tickets = new Schema({
    Ticketid: {
        type: String,
        unique: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    issueType: {
        type: String,
        enum: ['Software', 'Hardware', 'Network'],
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: [ 'open', 'close','pending'],
        default: 'open'
    },
    resolution: {
        type: String
    },
    assigned_to_Agent: {
        type: Boolean,
        required: true,
        default: false
    },
    assignedAgent: {
        type: String,
    },
    createdTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedTime: {
        type: Date,
    },
    closeTime: {
        type: Date,
    },
    rating: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
    },
    
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        required: true
    },
});


tickets.virtual('resolution_time').get(function () {
    if (this.closeTime && this.createdTime) {
        const duration = moment.duration(this.closeTime - this.createdTime);
        const resolutionTime = moment.utc(duration.asMilliseconds());
        return resolutionTime.format('YYYY-MM-DDTHH:mm:ss'); // Adjust the format as needed
    }
    return null;
});


tickets.pre('save', async function (next) {
    try {
        const user = await mongoose.model('User').findById(this.user);
        if (!user) {
        throw new Error('User not found');
      }
  
      this.user = user._id;
  
  
      next();
    } catch (error) {
      next(error);
    }
  });

const Ticket = mongoose.model('Ticket', tickets);
module.exports = Ticket;

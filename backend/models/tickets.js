const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tickets = new Schema({
    Ticketid: {
        type: Number,
        unique: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
        required: true,
        select: 'userid'
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
        enum: ['created', 'open', 'updated', 'close'],
        default: 'created'
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'agent_schema',
        select: 'agentid'
    },
    createdTime: {
        type: Date,
        required: true
    },
    updatedTime: {
        type: Date
    },
    closeTime: {
        type: Date,
        default: null
    },
    rating: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        required: true
    },
    routing: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        required: true
    },
});

const Ticket = mongoose.model('Ticket', tickets);
module.exports = Ticket;

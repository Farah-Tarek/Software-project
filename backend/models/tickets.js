const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/userSchema'); // Make sure the path is correct

const Ticket = require('./models/ticket'); // Make sure the path is correct

Ticket.get('/user-tickets/:userid', async (req, res) => {
try {
    const tickets = await Ticket.find({ user: req.params.userid });
    res.json(tickets);
} catch (error) {
    res.status(500).json({ message: 'Error fetching tickets' });
}
});

module.exports = router;
const tickets = new Schema({
    Ticketid: {
        type: Number,
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
        enum: ['created', 'open', 'updated', 'close','pending'],
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
        ref: 'agent_model',
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

tickets.pre('save', async function (next) {
    try {
    const user = await mongoose.model('User').findById(this.user);
    if (!user) {
        throw new Error('User not found');
    }

    this.user = user.userid;


    next();
    } catch (error) {
    next(error);
    }
});

const Ticket = mongoose.model('Ticket', tickets);
module.exports = Ticket;

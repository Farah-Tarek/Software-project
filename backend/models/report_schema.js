const mongoose = require('mongoose');
const Ticket = require('./tickets');
const User = require('./userSchema');
const Agent = require('./agent_schema');

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  ResolutionTime: {
    type: Date,
  },
  TicketStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    required: true,
    default: null,
  },
  UserRatings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
});

ReportSchema.pre('save', async function (next) {
  try {
    const ticket = await Ticket.findById(this.TicketStatus);
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    this.TicketStatus = ticket.TicketStatus;

    const agent = await Agent.findById(this.UserRatings);
    if (!agent) {
      throw new Error('Agent not found');
    }

    this.UserRatings = agent.UserRatings;

    // Assuming ResolutionTime is not a reference to another model
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Report', ReportSchema);

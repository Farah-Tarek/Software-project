const mongoose = require('mongoose');
const Ticket = require('../models/tickets');

const Schema = mongoose.Schema;

const sub_issues = new Schema({
  Ticketid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket', // Use the same name as used in mongoose.model for Ticket
    required: true,
    select: 'Ticketid',
  },
  issueType: {
    type: String,
    required: true,
  },
  sub_issues: {
    type: [String],
    validate: {
      validator: function () {
        switch (this.issueType) {
          case 'Hardware':
            return this.sub_issues.every(subIssue =>
              ['Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment'].includes(subIssue)
            );
          case 'Software':
            return this.sub_issues.every(subIssue =>
              ['Operating system', 'Application software', 'Custom software', 'Integration issues'].includes(subIssue)
            );
          case 'Network':
            return this.sub_issues.every(subIssue =>
              ['Email issues', 'Internet connection problems', 'Website errors'].includes(subIssue)
            );
          default:
            return true; // Other issue types are allowed to have any sub-issues
        }
      },
    },
  },
});

sub_issues.pre('save', async function (next) {
  try {
    const ticket = await mongoose.model('Ticket').findById(this.Ticketid);
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    this.issueType = ticket.issueType;

    next();
  } catch (error) {
    next(error);
  }
});

const issues = mongoose.model('issues', sub_issues);
module.exports = issues;

const mongoose = require('mongoose');
const tickets = require("./tickets");

const Schema = mongoose.Schema

const sub_issues = new Schema({
    Ticketid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true,
        select: 'Ticketid'
    },
      issueType: {
        type: mongoose.Schema.Types.ObjectId(),
        ref: "Ticket",
        required: true,
        select: 'issueType'

      },
      sub_issues: {
        type: [String],
        validate: {
          validator: function() {
            switch (this.issueType) {
              case 'hardware':
                return (['Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment'].includes(this.sub_issues));
              case 'software':
                return (['Operating system', 'Application software', 'Custom software', 'Integration issues'].includes(this.sub_issues));
              case 'network':
                return (['Email issues', 'Internet connection problems', 'Website errors'].includes(this.sub_issues));
              default:
                return false; // Other issue types are allowed to have any sub-issues
            }
          }
        }
    }
})



const issues = mongoose.model('issues', sub_issues);
module.exports = issues;
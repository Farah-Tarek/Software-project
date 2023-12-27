const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workflowSchema = new Schema({
  mainIssue: {
    type: String,
    required: true,
    enum: ['Hardware', 'Software', 'Network'],
  },
  subIssue: {
    type: String,
    required: true,
    validate: {
      validator: function () {
        switch (this.mainIssue) {
          case 'Hardware':
            return ['Desktops', 'Laptops', 'Printers', 'Servers', 'Networking Equipment'].includes(this.subIssue);
          case 'Software':
            return ['Operating System', 'Application Software', 'Custom Software', 'Integration Issues'].includes(this.subIssue);
          case 'Network':
            return ['Email Issues', 'Internet Connection Problems', 'Website Errors'].includes(this.subIssue);
          default:
            return false;
        }
      },
      message: 'Invalid subIssue for the selected mainIssue',
    },
  },
  workflow: {
    type: String,
    required: true,
  },
});

const Workflow = mongoose.model('Workflow', workflowSchema);
module.exports = Workflow;

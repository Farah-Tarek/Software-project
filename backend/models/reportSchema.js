const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userSchema');
const Agent = require('./agent_schema');
const Ticket = require('./tickets');


const reportSchema = new Schema({
    reportName: {
        type: String,
        required: true
    },
    generatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    generatedAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    reportData: {
        
        averageResolutionTime: Number,
        agentPerformance: [{
            name: String,
            resolvedTickets: Number,
            avgRating: Number
        }],
        ticketAnalytics: [{
            issueType: String,
            totalTickets: Number
        }]
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;

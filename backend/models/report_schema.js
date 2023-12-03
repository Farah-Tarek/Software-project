const mongoose = require('mongoose');
//Import the Ticket model
const Ticket = require('./tickets'); 
const user = require('./userSchema'); 
const agent = require('./agent_schema'); 

//Import the Automated model model
//const Automated = require('./Automated'); 
const Schema = mongoose.Schema


const ReportSchema = new Schema({


    ResolutionTime: 
    {
        type: Date,

    },


  Ticketstatus: 
    {
        type: String,

            type: mongoose.Schema.Types.ObjectId(),
                ref: "tickets",
                required: true,
                default : open,
                select: 'status',
            
        required: true,

    },


   AgentPerformance: 

    {
        
        type: Number,

            type: mongoose.Schema.Types.ObjectId(),
            ref: "agent_schema",  // ! check reference  mn meen ticket or automated workflow
            required: true,
            select: 'rating', 

        required: true,
        
    },




   UserRatings:

    {

          type: Number,

            type: mongoose.Schema.Types.ObjectId(),
            ref: "agent_schema",  // ! check reference  mn meen ticket or agent
            required: true,
            select: 'Rating', 

        required: true,

    },




})

    module.exports = mongoose.model('Report', ReportSchema);
    module.exports.Schema = ReportSchema;   
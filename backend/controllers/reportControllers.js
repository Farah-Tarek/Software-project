const reportSchema = require("../models/report_schema");
const Ticket = require('../models/tickets');
const SupportAgent = require('../models/agent_schema');

const ReportController = {
    GetAllTicketStatus: async (req, res) => {
        try {
            const ticketsStatus = await Ticket.find({}, 'Ticketid status');
            return res.status(200).json(ticketsStatus);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    },

    GetTotalTickets: async (req, res) => {
        try {
            const { createdTime } = req.body;

            // Validate if createdTime is provided in the request body
            if (!createdTime) {
                return res.status(400).json({ error: 'createdTime is required in the request body' });
            }

            // Convert createdTime to a format that matches the data in the database
            const formattedTime = new Date(createdTime);

            // Filter tickets based on the provided createdTime
            const filteredTickets = await Ticket.countDocuments({ createdTime: formattedTime });

            return res.status(200).json(filteredTickets);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    GetOneTicketStatus: async (req, res) => {
        try {
            const ticketstatus = await Ticket.findById(req.params.id, 'Ticketid status');

            // Check if the result is an array, and if so, return the first element
            if (Array.isArray(ticketstatus) && ticketstatus.length > 0) {
                return res.status(200).json(ticketstatus[0]);
            }

            return res.status(200).json(ticketstatus);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    GetAllAgentsPerformance: async (req, res) => {
        try {
            const agentPerformance = await SupportAgent.find({}, 'rating');
            return res.status(200).json(agentPerformance);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    },

    GetOneAgentPerformance: async (req, res) => {
        try {
            const user = await User.findOne()
            const agentPerformance = await SupportAgent.findById(req.params.id, 'rating');
            return res.status(200).json(agentPerformance);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

        getTicketsCountByDate: async (req, res) => {
            try {
                const { startDate, endDate } = req.body;
    
                if (!startDate || !endDate) {
                    return res.status(400).json({ error: 'Both startDate and endDate are required as query parameters.' });
                }
    
                const tickets = await Ticket.find({
                    createdTime: { $gte: new Date(startDate), $lte: new Date(endDate) },
                });
    
                res.json({ ticketsCount: tickets.length, tickets });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },


        get_specific_tickets_CountByDate: async (req, res) => {
            try {
                const { startDate, endDate, issueType } = req.body;
    
                if (!startDate || !endDate) {
                    return res.status(400).json({ error: 'Both startDate and endDate are required as query parameters.' });
                }
    
                const tickets = await Ticket.find({
                    issueType : issueType,
                    createdTime: { $gte: new Date(startDate), $lte: new Date(endDate) },
                });
    
                res.json({ ticketsCount: tickets.length, tickets });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },



        getTicketsCountBySubIssue_AndDate: async (req, res) => {
            try {
                const { subIssue, startDate, endDate } = req.query;
    
                if (!subIssue || !startDate || !endDate) {
                    return res.status(400).json({ error: 'subIssue, startDate, and endDate are required as query parameters.' });
                }
    
                const tickets = await Ticket.find({
                    subIssue,
                    createdTime: { $gte: new Date(startDate), $lte: new Date(endDate) },
                });
    
                const ticketsCount = tickets.length;
    
                res.json({ ticketsCount, tickets });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

        getTicketsCountBySubIssue: async (req, res) => {
            try {
                const { subIssue } = req.query;
    
                if (!subIssue) {
                    return res.status(400).json({ error: 'subIssue, startDate, and endDate are required as query parameters.' });
                }
    
                const tickets = await Ticket.find({
                    subIssue,
                    
                });
    
                const ticketsCount = tickets.length;
    
                res.json({ ticketsCount, tickets });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },


        generateReports: async (req, res) => {
            try {
                const ticketStatusReport = await Ticket.aggregate([
                    {
                        $group: {
                            _id: '$status',
                            tickets: { $push: '$$ROOT' },
                        },
                    },
                ]);
    
                const resolutionTimeReport = await Report.aggregate([
                    {
                        $group: {
                            _id: null,
                            tickets: { $push: '$$ROOT' },
                        },
                    },
                ]);
    
                const agentPerformanceReport = await SupportAgent.aggregate([
                    {
                        $group: {
                            _id: '$rating',
                            agents: { $push: '$$ROOT' },
                        },
                    },
                ]);
    
                res.json({
                    ticketStatusReport,
                    resolutionTimeReport,
                    agentPerformanceReport,
                });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
    };
    

        
        
module.exports = ReportController;

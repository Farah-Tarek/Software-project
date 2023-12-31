const User = require('./userSchema');
const Agent = require('./agent_schema');
const ReportSchema = require('../models/reportSchema'); 
const Ticket = require('./tickets');

const generateReports = async (req, res) => {
    try {
        
        const averageResolutionTime = await Ticket.aggregate([
            {
                $group: {
                    _id: null,
                    avgResolutionTime: { $avg: '$resolutionTime' }
                }
            }
        ]);

        // Calculate agent performance based on resolved tickets and average ratings
        const agentPerformance = await Agent.aggregate([
            {
                $project: {
                    name: 1,
                    resolvedTickets: 1,
                    avgRating: { $avg: '$rating' }
                }
            }
        ]);

        // Count the number of tickets for each issue and its sub-issues
        const ticketAnalytics = await Ticket.aggregate([
            {
                $group: {
                    _id: '$issueType',
                    totalTickets: { $sum: 1 }
                }
            }
        ]);

        //bar graph representation
        const analyticsData = ticketAnalytics.map((item) => ({
            issueType: item._id,
            totalTickets: item.totalTickets
        }));

        // Combine report data and analytics data
        const reportData = {
            averageResolutionTime: (averageResolutionTime.length > 0) ? averageResolutionTime[0].avgResolutionTime : null,
            agentPerformance: agentPerformance,
            ticketAnalytics: analyticsData
        };

        // Create a new instance of the Report model and save the generated report data to the database
        const newReport = new Report({
            reportName: 'Manager Report', 
            generatedBy: req.user._id, 
            generatedAt: new Date(),
            reportData: reportData
        });

        await newReport.save();

       
        res.json(reportData);
    } catch (error) {
        res.status(500).json({ message: error.message || 'An error occurred while generating reports.' });
    }
};

module.exports = { generateReports };

const report_schema = require("../models/report_schema");

const ReportController = {


    GetAllTicketStatus: async (req, res) => {
        try {
          const ticketsStatus = await report_schema.find();
          return res.status(200).json(reports);
        } catch (e) {
          return res.status(500).json({ message: e.message });
        }
      },


      GetOneTicketStatus: async (req, res) => {
        try {
          const ticketstatus = await report_schema.findById(req.params.id);
          return res.status(200).json(report);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      },


      GetAllAgentsPerformance: async (req, res) => {
        try {
          const AgentsPerformance = await report_schema.findById(req.params.id);
          return res.status(200).json(report);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      },


      GetOneAgentPerformance: async (req, res) => {
        try {
          const AgentPerformance = await report_schema.findById(req.params.id);
          return res.status(200).json(report);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      },


}
const express = require("express");
const router = express.Router();
const ReportController = require("../controllers/reportControllers");

router.get("/ticketStatus", ReportController.GetAllTicketStatus);
router.get("/GetTotalTickets", ReportController.GetTotalTickets);
router.get("/ticketStatus/:id", ReportController.GetOneTicketStatus);
router.get("/agentsPerformance", ReportController.GetAllAgentsPerformance);
router.get("/agentPerformance/:id", ReportController.GetOneAgentPerformance);

module.exports = router;

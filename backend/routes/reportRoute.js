const express = require("express");
const router = express.Router();
const ReportController = require("../controllers/reportControllers");

router.get("/ticketStatus", ReportController.GetAllTicketStatus);
router.get("/GetTotalTickets", ReportController.GetTotalTickets);
router.get("/ticketStatus/:id", ReportController.GetOneTicketStatus);
router.get("/agentsPerformance", ReportController.GetAllAgentsPerformance);
router.get("/agentPerformance/:id", ReportController.GetOneAgentPerformance);
router.get("/generateReports", ReportController.generateReports);
router.get("/getTicketsCountByDate", ReportController.getTicketsCountByDate);
router.get("/getTicketsCountBySubIssue", ReportController.getTicketsCountBySubIssue);
router.get("/getTicketsCountBySubIssueAndDate", ReportController.getTicketsCountBySubIssue_AndDate);
router.get("/getSpecificTicketsCountByDate", ReportController.get_specific_tickets_CountByDate);

module.exports = router;

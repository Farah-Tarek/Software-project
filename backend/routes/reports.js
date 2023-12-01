const express = require("express");
const router = express.Router();
const ReportController  =  require("../controllers/ReportController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");

// ! Do it later not now

// * Get all TicketStatus
router.get("/",authorizationMiddleware(['manager']), ReportController.GetAllTicketStatus);


// * Get One TicketStatus
router.get("/:id", authorizationMiddleware(['manager']),ReportController.GetOneTicketStatus);


// * Get all AgentPerformance
router.get("/",authorizationMiddleware(['manager']), ReportController.GetAllAgentsPerformance);


// * Get One AgentPerformance
router.get("/:id", authorizationMiddleware(['manager']),ReportController.GetOneAgentPerformance);


// ! Ask for ResolutionTime

module.exports = router;

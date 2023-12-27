// Example structure for workflowRoutes.js
const express = require('express');
const router = express.Router();
const WorkflowController = require('../controllers/workflowController');

// Define the route
router.get('/workflow', WorkflowController.getWorkflow);

// Export the router
module.exports = router;

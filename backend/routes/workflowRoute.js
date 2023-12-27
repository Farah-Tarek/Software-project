// In your routes or main Express file
const express = require('express');
const router = express.Router();
const  WorkflowController = require('../controllers/workflowController');
const authorizationMiddleware = require('../Middleware/authorizationMiddleware'); // Replace with your actual controller

// Define the route
router.get('/workflow',authorizationMiddleware(['admin']), WorkflowController.getWorkflow);

// Export the router
module.exports = router;
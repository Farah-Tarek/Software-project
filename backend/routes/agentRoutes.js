const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

// Create a new agent

// Get all agents
router.get('/agents', agentController.getAllAgents);

// Get a single agent by ID
router.get('/agents/:id', agentController.getAgentById);

// Update an agent by ID
router.put('/agents/:id', agentController.updateAgentById);

// Delete an agent by ID
router.delete('/agents/:id', agentController.deleteAgentById);

module.exports = router;

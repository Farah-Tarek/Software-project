const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");


// Create a new ticket
router.post('/tickets', ticketController.createTicket);

// Get all tickets
router.get('/tickets', ticketController.getAllTickets);

// Get a specific ticket by ID
router.get('/tickets/:Ticketid', ticketController.getTicketById);

// Update a ticket by ID
router.put('/tickets/:id', ticketController.updateTicket);

// Delete a ticket by ID
router.delete('/tickets/:id', ticketController.deleteTicketById);

module.exports = router;

// routes/conversationRoutes.js
const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

router.post('/conversations', conversationController.createConversation);
router.get('/conversations/:userId', conversationController.getUserConversations);
// Other conversation routes
// ...

module.exports = router;

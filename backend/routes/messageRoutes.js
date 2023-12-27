// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/MessageController');

router.post('/message', messageController.sendMessage);
router.get('/message/:conversationId', messageController.getConversationMessages);
// Other message routes
// ...

module.exports = router;

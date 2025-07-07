// messagesRoutes.js

const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');

// Route: GET /api/messages/:senderId/:receiverId
router.get('/activateChatService', messagesController.activateChatService);
router.get('/:senderId/:receiverId', messagesController.getMessagesBetweenMembers);
router.post('/', messagesController.sendMessage);

module.exports = router;

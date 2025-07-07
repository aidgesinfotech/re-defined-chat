const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/members', chatController.getAllMembers);
router.get('/messages', chatController.getMessages);

module.exports = router;

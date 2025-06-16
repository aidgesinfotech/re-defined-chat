const express = require('express');
const router = express.Router();
const groupChatController = require('../controllers/groupChatController');

router.get('/messages/:groupId', groupChatController.getGroupMessages);

module.exports = router;

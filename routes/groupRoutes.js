const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.get('/:memberId', groupController.getGroupsByMember);
router.get('/group-messages/:groupId', groupController.getGroupMessages);

module.exports = router;

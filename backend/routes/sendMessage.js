const express = require('express');
const router = express.Router();
const sendMessageController = require('../controllers/sendMessage');

router.get('/', sendMessageController.test);


module.exports = router;
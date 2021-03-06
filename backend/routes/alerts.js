const express = require('express');
const router = express.Router();
const alertsController = require('../controllers/alerts');

router.post('/new', alertsController.newAlert);
router.post('/delete', alertsController.deleteAlert);

module.exports = router;
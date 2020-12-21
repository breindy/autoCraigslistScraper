const express = require('express');
const router = express.Router();
const alertsController = require('../controllers/alerts');

router.get('/new', alertsController.newAlert);
router.get('/delete', alertsController.deleteAlert);

module.exports = router;
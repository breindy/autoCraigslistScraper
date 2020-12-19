const express = require('express');
const router = express.Router();
const rootController = require('../controllers/root');

router.get('/', rootController.root);

// router.get('/scraper', rootController.scraper);

module.exports = router;
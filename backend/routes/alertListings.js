const express = require('express');
const router = express.Router();
const alertListingController = require('../controllers/alertListings');

router.get('/fetch', alertListingController.fetchListings);

module.exports = router;
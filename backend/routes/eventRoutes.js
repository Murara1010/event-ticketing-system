const express = require('express');
const router = express.Router();
const { getEventDetails } = require('../controllers/eventController');

router.get('/:id', getEventDetails);

module.exports = router;
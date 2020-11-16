const express = require('express');

const salonController = require('../controllers/salonController');

const router = express.Router();

router.get('/', salonController.getSalons);

module.exports = router;
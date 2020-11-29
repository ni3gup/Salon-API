const express = require('express');

const customerController = require('../../controllers/customers/customerController');

const router = express.Router();

router.get('/genders', customerController.getGenders);

module.exports = router;
const express = require('express');

const salonController = require('../../controllers/v1/customers/salonController');

const router = express.Router();

router.get('/', salonController.getSalons);
router.get('/:id', salonController.getSalon);

module.exports = router;
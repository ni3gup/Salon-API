const express = require('express');

const authController = require('../../controllers/customers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/verify', authController.emailVerify);

module.exports = router;
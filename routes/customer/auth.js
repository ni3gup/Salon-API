const express = require('express');

const authController = require('../../controllers/v1/customers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/verify', authController.emailVerify);
router.post('/reset-password-link', authController.sendResetPasswordLink);
router.get('/reset-password', authController.resetPassword);
router.post('/reset-password', authController.postResetPassword);

module.exports = router;
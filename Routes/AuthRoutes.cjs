const express = require('express');
const { signup, login } = require('../Controllers/AuthController.cjs');
const ForgotPassword = require('../Controllers/ForgotPassword.cjs');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', ForgotPassword);

module.exports = router;

const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middlewares/AuthenticateToken.cjs');
const { getUserInfo } = require('../Controllers/UserController.cjs');

router.get('/user', authenticateToken, getUserInfo);
module.exports = router;

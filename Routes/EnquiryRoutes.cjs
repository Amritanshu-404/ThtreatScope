const express = require('express');
const router = express.Router();
const submitEnquiry = require('../Controllers/EnquiryController.cjs');

router.post('/', submitEnquiry);

module.exports = router;

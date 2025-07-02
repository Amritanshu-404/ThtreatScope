const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middlewares/AuthenticateToken.cjs');
const { submitThreat, getThreats } = require('../Controllers/ThreatController.cjs');
const getThreatById = require('../Controllers/GetThreatByIdController.cjs');
const deleteThreatById = require('../Controllers/DeleteThreatByIdController.cjs');

router.post('/submitthreats', authenticateToken, submitThreat);
router.get('/threatsdetails', authenticateToken, getThreats);
router.get("/download-report/:id", authenticateToken, getThreatById);
router.delete("/delete-report/:id", authenticateToken, deleteThreatById);

module.exports = router;

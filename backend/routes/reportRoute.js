const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/generate-reports', reportController.generateReports);

module.exports = router;
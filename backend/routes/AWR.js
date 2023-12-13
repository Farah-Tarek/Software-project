const express = require("express");
const router = express.Router();
require("../models/tickets.js");
require("../models/sub_issues.js");
require("../models/workflowSchema.js");
const AWController = require('../controllers/AWC.js');
router.get("/Solution", AWController.GetSolution);   
module.exports = router; // ! Don't forget to export the router
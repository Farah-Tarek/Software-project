const express = require("express");
const router = express.Router();
require("../models/KB.js");
const KnowledgeBaseController = require('../controllers/KBC.js');
router.get("/:CategoryType", KnowledgeBaseController.search);   
module.exports = router; // ! Don't forget to export the router
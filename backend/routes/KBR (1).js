const express = require("express");
const router = express.Router();
require("../models/KB");

const KnowledgeBaseController = require('../controllers/KBC');
// Middleware to check if the user is an admin
const authorizationMiddleware = require('../Middleware/authorizationMiddleware'); // adjust the path as needed


// Apply the checkAdmin middleware to the routes you want to protect
router.get("/searchbycat/:CategoryType", authorizationMiddleware(['admin']), KnowledgeBaseController.searchByCat);
router.get("/id/:BaseId", authorizationMiddleware(['admin', 'manager']), KnowledgeBaseController.searchById);
router.get("/get/getAll",authorizationMiddleware(['admin', 'manager']), KnowledgeBaseController.getAll);
router.post("/enter/insertbase", authorizationMiddleware(['admin', 'manager']), KnowledgeBaseController.insertBase);
router.delete("/delete/:id",authorizationMiddleware(['admin']), KnowledgeBaseController.deleteBase);
 

module.exports = router; 
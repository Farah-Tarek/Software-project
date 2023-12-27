const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/register', userController.registerUser);
router.put('/update/:userId', userController.updateUser);
router.post('/login', userController.loginUser);
router.post('/enable-mfa/:userId', userController.enableMFA);
router.post('/disable-mfa/:userId', userController.disableMFA);
router.post('/generate-mfa-secret', userController.generateMFASecret);
router.post('/create-agent', userController.createAgent);
router.post('/is-mfa-correct/:userId', userController.isMFAcorrect);
router.get('/notifications/:userId', userController.getAllNotificationController);
router.get('/unread_notifications/:userId', userController.get_all_unread_notification);
router.get('/read_notifications/:userId', userController.get_all_read_notification);
router.get('/:userId', userController.getUser);
router.get('/profile/:userId', userController.profile);
router.post('/manager-register', userController.Manager_registerUser);







module.exports = router;

const express = require('express');
const securityController = require('../controllers/securityController');

const router = express.Router();

// Define routes
router.post('/register', securityController.registerUser);

router.post('/setupMFA/:userId', async (req, res) => {
    const { userId } = req.params;
    const { mfaToken } = req.body;

    const result = await securityController.setupMFA(userId, mfaToken);

    if (result) {
        res.status(200).json({ message: 'MFA setup successful' });
    } else {
        res.status(400).json({ error: 'MFA setup failed' });
    }
});

router.post('/backupData', (req, res) => {
    securityController.backupData();
    res.status(200).json({ message: 'Backup initiated successfully' });
});

// Routes for encryption and decryption
router.post('/encrypt', (req, res) => {
    const { text } = req.body;
    const encryptedText = securityController.encrypt(text);
    res.status(200).json({ encryptedText });
});

router.post('/decrypt', (req, res) => {
    const { text } = req.body;
    const decryptedText = securityController.decrypt(text);
    res.status(200).json({ decryptedText });
});

// Routes for encryptMessage and decryptMessage
router.post('/encryptMessage', (req, res) => {
    const { message, secret } = req.body;
    const encryptedMessage = securityController.encryptMessage(message, secret);
    res.status(200).json({ encryptedMessage });
});

router.post('/decryptMessage', (req, res) => {
    const { encryptedMessage, secret } = req.body;
    const decryptedMessage = securityController.decryptMessage(encryptedMessage, secret);
    res.status(200).json({ decryptedMessage });
});

// Add other routes...

module.exports = router;

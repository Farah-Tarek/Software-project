// routes/adminBrandingRoutes.js
const express = require('express');
const adminBrandingController = require('../controllers/adminBranding');

const router = express.Router();

const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

// Routes for handling customization of specific properties
router.patch('/customize/colorScheme', authorizationMiddleware(['admin']), adminBrandingController.updateColorScheme);

router.patch('/customize/logoUrl', authorizationMiddleware(['admin']), adminBrandingController.updateLogo);

router.patch('/customize/fontStyle', authorizationMiddleware(['admin']), adminBrandingController.updateFontStyle);

router.patch('/customize/fontSize', authorizationMiddleware(['admin']), adminBrandingController.updateFontSize);

router.patch('/customize/organizationName', authorizationMiddleware(['admin']), adminBrandingController.updateOrganizationName);

router.patch('/customize/headerCustomization', authorizationMiddleware(['admin']), adminBrandingController.updateHeader);

router.patch('/customize/footerCustomization', authorizationMiddleware(['admin']), adminBrandingController.updateFooter);
  
// Route for updating Help Desk appearance
//router.patch('/:id/customize', adminBrandingController.customizeHelpDesk);
module.exports = router;

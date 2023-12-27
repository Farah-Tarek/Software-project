const brandingModel = require("../models/Branding");

const updateColorScheme = async (req, res) => {
   // Assuming colorBackground, pageColor, and buttonColor are properties you want to update
   const { colorBackground, pageColor, buttonColor } = req.body;

    try{
        const oldBranding = await brandingModel.findOne({}, 'colorBackground pageColor buttonColor');
   // Update the color scheme without using ID
   const updatedBranding = await brandingModel.findOneAndUpdate(
        oldBranding,// Find the first document (you might want to add more specific conditions)
     { colorBackground: colorBackground, pageColor: pageColor, buttonColor: buttonColor },
     { new: true }
   );
   res.status(201).json({ message: "Colors updated successfully", update: updatedBranding });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFontStyle = async (req, res) => {
    // Assuming colorBackground, pageColor, and buttonColor are properties you want to update
    const { fontStyle } = req.body;
 
     try{
         const oldBranding = await brandingModel.findOne({}, 'fontStyle');
    // Update the color scheme without using ID
    const updatedBranding = await brandingModel.findOneAndUpdate(
         oldBranding,// Find the first document (you might want to add more specific conditions)
      { fontStyle: fontStyle },
      { new: true }
    );
    res.status(201).json({ message: "Font styles updated successfully", update: updatedBranding });
 
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 };

 const updateFontSize = async (req, res) => {
    // Assuming colorBackground, pageColor, and buttonColor are properties you want to update
    const { titleFontSize, paragraphFontSize, headerFontSize } = req.body;
 
     try{
         const oldBranding = await brandingModel.findOne({}, 'titleFontSize paragraphFontSize headerFontSize');
    // Update the color scheme without using ID
    const updatedBranding = await brandingModel.findOneAndUpdate(
         oldBranding,// Find the first document (you might want to add more specific conditions)
      { titleFontSize: titleFontSize, paragraphFontSize: paragraphFontSize, headerFontSize, headerFontSize },
      { new: true }
    );
    res.status(201).json({ message: "Font size updated successfully", update: updatedBranding });
 
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 };

 const updateOrganizationName = async (req, res) => {
    // Assuming colorBackground, pageColor, and buttonColor are properties you want to update
    const { organizationName } = req.body;
 
     try{
         const oldBranding = await brandingModel.findOne({}, 'organizationName');
    // Update the color scheme without using ID
    const updatedBranding = await brandingModel.findOneAndUpdate(
         oldBranding,// Find the first document (you might want to add more specific conditions)
      { organizationName: organizationName },
      { new: true }
    );
    res.status(201).json({ message: "Company name updated successfully", update: updatedBranding });
 
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 };

 const updateHeader = async (req, res) => {
    // Assuming colorBackground, pageColor, and buttonColor are properties you want to update
    const { headerCustomization } = req.body;
 
     try{
         const oldBranding = await brandingModel.findOne({}, 'headerCustomization');
    // Update the color scheme without using ID
    const updatedBranding = await brandingModel.findOneAndUpdate(
         oldBranding,// Find the first document (you might want to add more specific conditions)
      { headerCustomization: headerCustomization },
      { new: true }
    );
    res.status(201).json({ message: "Header updated successfully", update: updatedBranding });
 
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 };
 
 const updateFooter = async (req, res) => {
    // Assuming colorBackground, pageColor, and buttonColor are properties you want to update
    const { footerCustomization } = req.body;
 
     try{
         const oldBranding = await brandingModel.findOne({}, 'footerCustomization');
    // Update the color scheme without using ID
    const updatedBranding = await brandingModel.findOneAndUpdate(
         oldBranding,// Find the first document (you might want to add more specific conditions)
      { footerCustomization: footerCustomization },
      { new: true }
    );
    res.status(201).json({ message: "Footer updated successfully", update: updatedBranding });
 
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 };
 
 const updateLogo = async (req, res) => {
    // Assuming colorBackground, pageColor, and buttonColor are properties you want to update
    const { logoUrl } = req.body;
 
     try{
         const oldBranding = await brandingModel.findOne({}, 'logoUrl');
    // Update the color scheme without using ID
    const updatedBranding = await brandingModel.findOneAndUpdate(
         oldBranding,// Find the first document (you might want to add more specific conditions)
      { logoUrl: logoUrl },
      { new: true }
    );
    res.status(201).json({ message: "Logo updated successfully", update: updatedBranding });
 
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 };
 
 

// Controller for updating Help Desk appearance
//const customizeHelpDesk = async (req, res) => {
  //const { id } = req.params;
  //try {
    //const updatedAdminBranding = await brandingModel.findByIdAndUpdate(id, req.body, { new: true });
    //res.json(updatedAdminBranding);
  //} catch (error) {
    //res.status(500).json({ error: error.message });
  //}
//};

module.exports = {
  updateColorScheme,
  updateFontSize,
  updateFontStyle,
  updateFooter,
  updateHeader,
  updateLogo,
  updateOrganizationName
  //customizeHelpDesk,
};
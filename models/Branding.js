const mongoose = require('mongoose');
const Schema = mongoose.Schema

const brandingSchema = new Schema({
    organizationName: {
        type: String,
        required: true,
      },
    
      colorBackground: {
        type: String,
        required: true
      },

      pageColor: {
        type: String,
        required: true
      },

      buttonColor: {
        type: String,
        required: true
      },

      logoUrl: {
        type: String,
        required: true,
      },
      fontStyle: {
        type: String,
        required: true,
      },
      bodyFontSize: {
        type: Number,
        required: true,
      },

      paragraphFontSize: {
        type: Number,
        required: true,
      },

      headerFontSize: {
        type: Number,
        required: true,
      },
      headerCustomization: {
        type: String,
        required: true,
      },
      footerCustomization: {
        type: String,
        required: true,
      },
})
const Brand = mongoose.model('Branding', brandingSchema);
module.exports = Brand;
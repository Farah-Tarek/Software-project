const mongoose = require("mongoose");
const userSchema = require("../models/userSchema");

const schemaOptions = {
  strict: true,
  timestamps: true,
};
const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
      requied: true,
    },
    token: {
      type: String,
      requied: true,
    },
    expiresAt: {
      type: Date,
      requied: true,
    },
  },
 schemaOptions
);

module.exports = mongoose.model("sessionschemas", sessionSchema);
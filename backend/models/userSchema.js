const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
    required: true,
  },
  userid: {
    type: Number,
    required: true,
    unique: true, 
  },
  userpassword: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mfa: {
    enabled: { type: Boolean, default: false },
    secret: { type: String },
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin", "supportagent", "manager"],
  },
});
const User = mongoose.model('User', userSchema);
module.exports = User;

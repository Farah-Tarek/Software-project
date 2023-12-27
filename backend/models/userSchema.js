const mongoose = require('mongoose');
//const { encrypt, decrypt, generateMFASecret } = require('../controllers/securityController');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  mfa: {
    enabled: {
      type: Boolean,
    },
    secret: {
      type: String,
    }
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin", "supportagent", "manager"],
  },

  token: {
    type: String
},
  

  notifcation: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },




});
const User = mongoose.model('User', userSchema);
module.exports = User;


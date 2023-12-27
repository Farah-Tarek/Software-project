const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userSchema');



const SupportAgentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstname: {
    type: String,
  },
  Lastname: {
    type: String,
  },
  userpassword: {
    type: String,
  },
  email: {
    type: String,
  },
  rating: {
    type: Number,
  },
  number_of_assigned_tickets: {
    type: Number,
    default: 0
  },
  available: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    default: 'supportagent'
  },
  mfa: {
    enabled: {
      type: Boolean,
    },
    secret: {
      type: String,
    }
  },
  major: {
    type: String,
  },
  agent_type: {
    type: String,
    enum: ['Agent 1', 'Agent 2', 'Agent 3'],
    required: true
  }
});

// Middleware to automatically populate fields from the associated user
SupportAgentSchema.pre('save', async function (next) {
  try {
    const user = await mongoose.model('User').findById(this.userId);
    if (!user) {
      throw new Error('User not found');

    }

    this.userId = user.userid;

    this.firstname = user.firstname;
    this.Lastname = user.Lastname;
    this.userpassword = user.password; // Use the hashed password from User model
    this.email = user.email;
    this.rating = 0;
    this.number_of_assigned_tickets = 0;
    this.available = true;
    this.role = 'supportagent';

    next();
  } catch (error) {
    next(error);
  }
});

const SupportAgent = mongoose.model('SupportAgent', SupportAgentSchema);

module.exports = SupportAgent;

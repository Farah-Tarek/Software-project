const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    default:0
  },
  available: {
    type: Boolean,
    default:'yes'
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
  agent_type:{
    type:String,
    enum :['Agent 1','Agent 2','Agent 3'],
    required: true

  }


});

// Middleware to automatically populate email and password from the associated user
SupportAgentSchema.pre('save', async function (next) {
  try {
    const user = await mongoose.model('User').findById(this.userId);
    if (!user) {
      throw new Error('User not found');
    }

    this.email = user.email;
    this.userpassword = user.userpassword;
    this.firstname = user.firstname;
    this.Lastname = user.Lastname;


    next();
  } catch (error) {
    next(error);
  }
});

const SupportAgent = mongoose.model('SupportAgent', SupportAgentSchema);

module.exports = SupportAgent;
